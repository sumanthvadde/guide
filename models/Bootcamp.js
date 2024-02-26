const mongoose = require("mongoose");
const geocoder = require("../utils/geocoder");
const slugify = require("slugify");

const BootcampSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please add name for Bootcamp"],
			unique: true,
			trim: true,
			maxLength: [50, "Length cannot exceed 50 characters"],
		},
		slug: String,
		description: {
			type: String,
			required: [true, "Please add a description"],
			maxLength: [500, "Length cannot exceed 500 characters"],
		},
		website: {
			type: String,
			match: [
				/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
				"Please use a valid URL with HTTP or HTTPS",
			],
		},
		phone: {
			type: String,
			maxLength: [20, "Length cannot exceed 10 characters"],
		},
		email: {
			type: String,
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				"Please add a valid email",
			],
		},
		address: {
			type: String,
			required: [true, "Please add an address"],
		},
		location: {
			type: {
				type: String,
				enum: ["Point"],
			},
			coordinates: {
				type: [Number],
				index: "2dsphere",
			},
			formattedAddress: String,
			street: String,
			city: String,
			state: String,
			zipcode: String,
			country: String,
		},
		careers: {
			type: [String],
			required: true,
			enum: [
				"Web Development",
				"Mobile Development",
				"UI/UX",
				"Data Science",
				"Business",
				"Other",
			],
		},
		averageRating: {
			type: Number,
			min: [1, "Min Rating cannot be less than 1"],
			max: [10, "Max Rating cannot be more that 10"],
		},
		averageCost: Number,
		photo: {
			type: String,
			default: "no-photo.jpg",
		},
		housing: {
			type: Boolean,
			default: false,
		},
		jobAssistance: {
			type: Boolean,
			default: false,
		},
		jobGuarantee: {
			type: Boolean,
			default: false,
		},
		acceptGi: {
			type: Boolean,
			default: false,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

// Create bootcamp slug from the name
BootcampSchema.pre("save", function (next) {
	this.slug = slugify(this.name, { lower: true });
	next();
});

// Geocode & create location field
BootcampSchema.pre("save", async function (next) {
	const loc = await geocoder.geocode(this.address);
	this.location = {
		type: "Point",
		coordinates: [loc[0].longitude, loc[0].latitude],
		formattedAddress: loc[0].formattedAddress,
		street: loc[0].streetName,
		city: loc[0].city,
		state: loc[0].stateCode,
		zipcode: loc[0].zipcode,
		country: loc[0].countryCode,
	};

	// Do not save address in DB
	this.address = undefined;
	next();
});

// Cascade delete courses when a bootcamp is deleted
BootcampSchema.pre("remove", async function (next) {
	console.log(`Courses being removed from bootcamp ${this._id}`);
	await this.model("Course").deleteMany({ bootcamp: this._id });
	console.log(`Reviews being removed from bootcamp ${this._id}`);
	await this.model("Review").deleteMany({ bootcamp: this._id });
	next();
});

// Reverse populate with virtuals
BootcampSchema.virtual("courses", {
	ref: "Course",
	localField: "_id",
	foreignField: "bootcamp",
	justOne: false,
});

module.exports = mongoose.model("Bootcamp", BootcampSchema);