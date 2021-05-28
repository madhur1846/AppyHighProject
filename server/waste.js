// export const GetUsersStory = async (
// 	usernameforsearch,
// 	IG_USERNAME,
// 	IG_PASSWORD
// ) => {
// 	const ig = new IgApiClient();
// 	ig.state.generateDevice(IG_USERNAME);
// 	// ig.state.proxyUrl = process.env.IG_PROXY;
// 	const auth = await ig.account.login(IG_USERNAME, IG_PASSWORD);
// 	const targetUser = await ig.user.searchExact(usernameforsearch); // getting exact user by login
// 	const reelsFeed = ig.feed.reelsMedia({
// 		// working with reels media feed (stories feed)
// 		userIds: [targetUser.pk], // you can specify multiple user id's, "pk" param is user id
// 	});
// 	const storyItems = await reelsFeed.items(); // getting reels, see "account-followers.feed.example.ts" if you want to know how to work with feeds
// 	// console.log(storyItems);
// 	// console.log(
// 	// 	"----------------------------------------------------------------------"
// 	// );
// 	var videoURL = [];
// 	var imageURL = [];
// 	for (var i = 0; i < storyItems.length; i++) {
// 		if (storyItems[i].hasOwnProperty("image_versions2")) {
// 			// console.log(storyItems[i].image_versions2.candidates[0].url);
// 			imageURL.push(storyItems[i].image_versions2.candidates[0].url);
// 		}
// 		if (storyItems[i].hasOwnProperty("video_versions")) {
// 			// console.log(storyItems[i].video_versions[0].url);
// 			videoURL.push(storyItems[i].video_versions[0].url);
// 		}
// 	}
// 	if (storyItems.length === 0) {
// 		// we can check items length and find out if the user does have any story to watch
// 		console.log(`${targetUser.username}'s story is empty`);
// 		return;
// 	}
// 	const seenResult = await ig.story.seen([storyItems[0]]);
// 	// now we can mark story as seen using story-service, you can specify multiple stories, in this case we are only watching the first story

// 	console.log(seenResult.status); // seenResult.status should be "ok"
// };

// // GetUsersStory("bansal.disha", "madhur_1846", "bajrangbalikijai");
