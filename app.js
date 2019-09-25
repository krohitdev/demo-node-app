var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    seedDb = require("./seeds");

    
mongoose.connect("mongodb://localhost/yelp_camp_v3",{ useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
//seedDb(); // uncomment if want to save campground and comment

/*
 Campground.create(
    {
        name:"Salmon Creek",
        image:"https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg",
        description:"Beau"
    
    },function(err,campground){
        if(err){
            console.log("Error is ",err);
        }
        else{
            console.log("Campround is created ",campground);
        }
    }
 )*/
/*
var campgrounds = [
    {name:"Salmon Creek",image:"https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
    {name:"Granite Hill",image:"https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"},
    {name:"Mountain Goat's Rest",image:"https://farm8.staticflickr.com/7338/9627572189_12dbd88ebe.jpg"},
    {name:"Salmon Creek",image:"https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
    {name:"Granite Hill",image:"https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"},
    {name:"Mountain Goat's Rest",image:"https://farm8.staticflickr.com/7338/9627572189_12dbd88ebe.jpg"},
];
*/
app.get("/", function(req,res){
    // res.send("this is landing page");
    res.render("landing");
});

//INDEX - show all campgrounds
app.get("/campgrounds", function(req,res){
    //Get all campground from DB;
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }
    });

  
});

//CREATE - add new campground to DB
app.post("/campgrounds", function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;

    var newCampground = {name:name,image:image,description:desc};
   // Create a new campground and save to db
    Campground.create(newCampground,function(err,newlyCreated){
        if(err){
            console.log(err)
        }
        else{
            //console.log(newlyCreated);
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    })
   
    //res.render("new.ejs")
});

//NEW - show form to create new campground 
app.get("/campgrounds/new",function(req,res){
    res.render("campgrounds/new.ejs")
});

app.get("/campgrounds/:id",function(req,res){
    
    //find the campground with the provided id 
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }
        else{
           res.render("campgrounds/show",{campground:foundCampground});
        }
    });
    //render show template with that campground
});

// =====================================
// COMMENTS ROUTES
// =====================================

app.get("/campgrounds/:id/comments/new", function(req, res){
    // res.send("This will the comment form");  
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err)
        }else{
            //console.log(campground);
            res.render("comments/new",{campground:campground})
        }
    });  
    //res.render("comments/new");
});

app.post("/campgrounds/:id/comments",function(req,res){
    //lookup campground using ID
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campground")
        }else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err);
                }else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/'+campground._id);
                }
            });
        }
        //create new comment
        //connect new comment to campground
        //redirect campground show page
    });
    
});

app.listen(3000, function(){
    console.log("app has started;");
})