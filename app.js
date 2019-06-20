var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");


mongoose.connect("mongodb://localhost/yelp_camp",{ useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs")


//SCHEMA SETUP
var campgroundsSchema = new mongoose.Schema({
    name:String,
    image:String
});

var Campground = mongoose.model("Campground",campgroundsSchema);

/* Campground.create(
    {
        name:"Granite Hill",
        image:"https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"
    },function(err,campground){
        if(err){
            console.log("Error is ",err);
        }
        else{
            console.log("Campround is created ",campground);
        }
    }
)
*/
var campgrounds = [
    {name:"Salmon Creek",image:"https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
    {name:"Granite Hill",image:"https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"},
    {name:"Mountain Goat's Rest",image:"https://farm8.staticflickr.com/7338/9627572189_12dbd88ebe.jpg"},
    {name:"Salmon Creek",image:"https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
    {name:"Granite Hill",image:"https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"},
    {name:"Mountain Goat's Rest",image:"https://farm8.staticflickr.com/7338/9627572189_12dbd88ebe.jpg"},
];

app.get("/", function(req,res){
    // res.send("this is landing page");
    res.render("landing");
});

//INDEX - show all campgrounds
app.get("/campgrounds", function(req,res){
   
    Campground.find({},function(err,campgrounds){
        if(err){
            console.log(err);
        }else{
            console.log(campgrounds)
        }
    });

    res.render("campgrounds",{campgrounds:campgrounds});
});

//CREATE - add new campground to DB
app.post("/campgrounds", function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name:name,image:image};
   // campgrounds.push(newCampground);
    Campground.create({

    },function(err,maxTalengetshow){
        if(err){
            console.log(err)
        }
        else{
            console
        }
    })
    res.redirect("/campgrounds");
    res.render("new.ejs")
});

//NEW - show form to create new campground 
app.get("/campgrounds/new",function(req,res){
    res.render("new.ejs")
});

app.listen(3000, function(){
    console.log("app has started;");
})