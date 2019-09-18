var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [
    { 
        name: "Cloud's Rest",
        image : "https://photosforclass.com/download/pixabay-1851092?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c73277cdd9749c25a_960.jpg&user=Pexels"
    },
    { 
        name: "Beach",
        image : "https://cdn.pixabay.com/photo/2015/10/12/14/57/campfire-984020_960_720.jpg",
        description: "Beach Testt Beach Testt Beach Testt"
    },
    {
        name: "Peace Car",
        image: "https://cdn.pixabay.com/photo/2013/07/13/11/36/volkswagen-158463_960_720.png",
        description: "Test test test testtest testtest testtest testtest test  "
    },
    {
        name: "Mountain Hills",
        image: "https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201_960_720.jpg",
        description: "test testtest test test testtest testtest test "
    }
]
function seedDb(){
    //Remove all campgrounds
    Campground.remove({},function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds.");

        // add a few comments
        data.forEach((seed)=>{
            Campground.create(seed,function(err, campground){
                if(err){
                    console.log(err);
                }else{
                    console.log('campground added');
                    //create a comment
                    Comment.create({
                        text: "This is greate but I wish there was internet",
                        author: "Homer"
                    },function(err,comment){
                        if(err){
                            console.log(err);
                        }else{
                            campground.comments.push(comment);
                            campground.save();
                            console.log('Create new comment')
                        }
                        
                    });
                }
            });
        });
    });

    //add a few campgrounds

    
    
}

module.exports = seedDb;