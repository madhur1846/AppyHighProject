const mongoose = require('mongoose');
const ArrayUrls = new mongoose.Schema({
	urls : String
}
);

const UserStoriesSchema = mongoose.Schema({
	 username : {
		 type: String
	 },
	 stories : [
		{
			followerUser_name : {type:String},
			profilePic : {type:String},
			urls: {type:[ArrayUrls]},
		}
	 ]
});

module.exports = mongoose.model('Story', UserStoriesSchema);