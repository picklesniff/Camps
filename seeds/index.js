const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/re-yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            author: '64843015d186217e8f73a26c',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis dolorem nisi illum neque, necessitatibus, vitae quibusdam similique quae tempore, odio maxime praesentium distinctio expedita quas. Vitae facilis quidem fugiat neque.',
            price,
            geometry: {
                type: "Point",
                coordinates: [cities[random1000].longitude, 
                              cities[random1000].latitude]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dxtkoqd6k/image/upload/v1686792328/YelpCamp/tvdpnyeddmvcrmpjisyu.jpg',
                    filename: 'YelpCamp/tvdpnyeddmvcrmpjisyu',
                },
                {
                    url: 'https://res.cloudinary.com/dxtkoqd6k/image/upload/v1686792328/YelpCamp/ze2ivwfhquzcvg8iaycr.avif',
                    filename: 'YelpCamp/ze2ivwfhquzcvg8iaycr',
                },
                {
                    url: 'https://res.cloudinary.com/dxtkoqd6k/image/upload/v1686795732/YelpCamp/qvaregcncqtcxyecodfm.jpg',
                    filename: 'YelpCamp/qvaregcncqtcxyecodfm',

                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})