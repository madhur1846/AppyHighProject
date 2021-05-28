 
// NOTICE : Due to fiver i can't able to complete full client side code. Sorry for that.


// import express from 'express';
// import mongoose from 'mongoose'
// import bodyParser from 'body-parser';
// import cors from 'cors';
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Story = require('./database.js');

// import { GetAllStories } from './fetchingData.js';
// const {GetAllStories} = require('./fetchingData.js');
const app = express();

app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());




// import "dotenv/config";
// import { IgApiClient } from "instagram-private-api";
// import {Story} from "./database.js";
const {IgApiClient} = require('instagram-private-api');
// const Story = require('./database.js');

const GetAllStories = async (IG_USERNAME, IG_PASSWORD) => {
	const ig = new IgApiClient();
	ig.state.generateDevice(IG_USERNAME);
	const auth = await ig.account.login(IG_USERNAME, IG_PASSWORD);
	// console.log(JSON.stringify(auth));

	const reelsFeed = ig.feed.reelsTray("cold_start");
	const storyItems = await reelsFeed.items(); // getting reels, see "account-followers.feed.example.ts" if you want to know how to work with feeds
	// console.log(storyItems[0].user.profile_pic_url);
	// console.log(storyItems);
	var storiess = [];
	for (var i = 0; i < storyItems.length; i++) {
		var story = {
			username: storyItems[i].user.username,
			profile_url: storyItems[i].user.profile_pic_url,
			weekdays: []
		};
		// GetUsersStory(storyItems[i].user.username, IG_USERNAME, IG_PASSWORD);

		const targetUser = await ig.user.searchExact(storyItems[i].user.username); // getting exact user by login
		const reelsFeed = ig.feed.reelsMedia({
			// working with reels media feed (stories feed)
			userIds: [targetUser.pk], // you can specify multiple user id's, "pk" param is user id
		});
		const storyItemss = await reelsFeed.items(); // getting reels, see "account-followers.feed.example.ts" if you want to know how to work with feeds
		for (var j = 0; j < storyItemss.length; j++) {
			if (storyItemss[j].hasOwnProperty("image_versions2")) {
				// console.log(storyItems[i].image_versions2.candidates[0].url);
				story.weekdays.push(storyItemss[j].image_versions2.candidates[0].url);
			}
			if (storyItemss[j].hasOwnProperty("video_versions")) {
				// console.log(storyItems[i].video_versions[0].url);
				story.weekdays.push(storyItemss[j].video_versions[0].url);
			}
		}
		// we can diffentiate Image_URL and Video_URL using "is_image_url" npm package in React.Js so can render Accordingly 
		console.log(story);
		storiess.push(story);
	}
	const newUserStoriesSchema = new Story({
		username: IG_USERNAME,
		sotries : storiess,
	});
	await newUserStoriesSchema.save();
	if (storyItems.length === 0) {
		// we can check items length and find out if the user does have any story to watch
		console.log(`${targetUser.username}'s story is empty`);
		return;
	}
	const seenResult = await ig.story.seen([storyItems[0]]);
	//   // now we can mark story as seen using story-service, you can specify multiple stories, in this case we are only watching the first story

	console.log(seenResult.status); // seenResult.status should be "ok"
}



app.get("/stories", async (req, res) => {
	// For checking call GetAllStories function here with username and password and in command line it will gives all URLS
	var userId = req.userId;
	const AllStories = await Story.find({ username: userId });
	return res.send(AllStories);
})

app.post("/", async (req, res) => {
	const username = req.username;
	const password = req.password;
	await GetAllStories(username, password);
})

const MONGODB_KEY = 'mongodb+srv://Madhur:7982746691@yourvoicedatabase.cfxnl.mongodb.net/YourVoiceDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGODB_KEY, {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => app.listen(PORT, () => console.log(`Server Running on port ${PORT}`)))
	.catch((err) => console.log(err));



app.listen(8000);