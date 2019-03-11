const mongoose = require("mongoose");
const Campground = require("./models/campgrounds");
const Comment = require("./models/comments");

let data = [
	{
		name: "Lipovaca",
		image:
			"https://images.unsplash.com/photo-1502218808493-e5fd26249efc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus condimentum varius neque, ac auctor nisi convallis vulputate. Nunc aliquam pretium tortor id euismod. Mauris sit amet dolor metus. Vivamus euismod, orci vel vestibulum rhoncus, magna libero iaculis risus, sed dignissim justo massa eu eros. Curabitur at pretium orci, non aliquet purus. Phasellus venenatis commodo nibh non blandit. Duis ac odio volutpat, faucibus tellus vel, placerat libero. Nunc elementum, tortor vel dictum semper, erat lacus cursus nibh, eu tincidunt ex justo at augue. Quisque condimentum augue et leo pretium, et commodo purus efficitur. In hac habitasse platea dictumst. Integer accumsan est ut elit fringilla, at tempus lorem tempus. Aenean fermentum, elit quis lobortis vulputate, enim tortor faucibus odio, a condimentum sem purus in odio. Proin quam orci, suscipit vel porta fermentum, maximus quis arcu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer mi ex, lobortis quis lacinia sit amet, consequat vel magna. Morbi ut neque neque."
	},
	{
		name: "Vojno Loviste",
		image:
			"https://images.unsplash.com/photo-1487750404521-0bc4682c48c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description:
			"Integer varius vulputate urna ut pretium. Morbi eu eros finibus, facilisis nisl at, fermentum libero. Nullam a orci non dolor posuere suscipit nec id lorem. Nulla vitae metus scelerisque, rutrum erat nec, sagittis magna. Integer malesuada non leo in accumsan. Morbi maximus, lorem tristique commodo venenatis, libero arcu luctus turpis, nec luctus mauris lectus ac velit. Curabitur facilisis, risus pellentesque ornare eleifend, eros dolor ultrices nisl, et suscipit tortor velit ut ipsum. Sed gravida aliquam tellus. Vivamus elit augue, dictum ut volutpat sed, consectetur eu nisl. Suspendisse id libero in ex aliquet ullamcorper. Maecenas pulvinar sem non felis porta, pulvinar pretium libero pharetra. Quisque vitae arcu ac tellus sagittis mattis in aliquam sem. Curabitur quis orci ex."
	},
	{
		name: "Sotsko Jezero",
		image:
			"https://images.unsplash.com/photo-1499363145340-41a1b6ed3630?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description:
			"Praesent varius, eros at interdum convallis, enim eros interdum est, vel tempus dolor libero in sem. Proin semper leo lectus, volutpat suscipit felis bibendum nec. Aenean vitae volutpat ipsum. Ut sagittis nibh erat, eu finibus ipsum mattis id. Nullam eu nisi nec mi eleifend facilisis in eu tortor. Maecenas volutpat cursus nisi, at vulputate metus luctus at. Duis condimentum metus a gravida malesuada. Morbi fringilla enim non vulputate molestie. Etiam facilisis magna vitae tellus accumsan, nec viverra nisi cursus. Nullam nisl magna, tincidunt vitae ipsum id, mattis molestie dolor. Praesent maximus tellus mauris, ut volutpat risus mollis sit amet. Donec aliquam, magna at porta congue, elit ligula pulvinar metus, pulvinar placerat lorem purus ac ipsum. Fusce sollicitudin, neque at sollicitudin venenatis, enim eros ultricies massa, ac porta est justo at neque."
	},
	{
		name: "Gradina",
		image:
			"https://images.unsplash.com/photo-1494254400119-9a456213b4a2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description:
			"Phasellus vitae laoreet arcu, et aliquam quam. Sed vitae vestibulum orci, non porttitor felis. Fusce euismod tempus congue. Pellentesque ornare mauris sit amet neque dignissim, vel sodales est porttitor. Fusce ultrices ac mi eu cursus. Sed nec volutpat dolor. Vestibulum dignissim libero sit amet ante facilisis, ut cursus nunc lobortis. Quisque justo quam, fringilla in nisi vel, aliquam porta eros. Phasellus mollis, libero eget porta aliquet, sapien eros auctor nibh, id pulvinar diam enim quis massa. Pellentesque sed accumsan tellus. Sed risus nunc, sagittis ut bibendum dapibus, lobortis vel eros."
	}
];

function seedDB() {
	// remove campground
	Campground.remove({}, (err) => {
		// if (err) {
		// 	console.log(err);
		// } else {
		// 	console.log('removed campgrounds');
		// }
		// // add a new campground
		// data.forEach((seed) => {
		// 	Campground.create(seed, (err, campground) => {
		// 		if (err) {
		// 			console.log(err);
		// 		} else {
		// 			console.log('added campgrounds');
		// 			// create a comment
		// 			// Comment.create(
		// 			// 	{
		// 			// 		text: 'This place is great, only if it had Wi-Fi, Doh ...',
		// 			// 		author: 'Homer Simpson'
		// 			// 	},
		// 			// 	(err, comment) => {
		// 			// 		if (err) {
		// 			// 			console.log(err);
		// 			// 		} else {
		// 			// 			campground.comments.push(comment);
		// 			// 			campground.save();
		// 			// 			console.log('created new comment');
		// 			// 		}
		// 			// 	}
		// 			// );
		// 		}
		// 	});
		// });
	});
}

module.exports = seedDB;
