import banner1 from './images/model1.jpg';
import banner2 from './images/model2.jpg';
import banner3 from './images/model3.jpg';
import banner4 from './images/model4.jpg';
import banner5 from './images/mdModel1.jpg';
import banner6 from './images/mdModel2.jpg';
import banner7 from './images/mdModel3.jpg';
import banner8 from './images/mdModel4.jpg';
import category1 from './images/category1.jpg';
import category2 from './images/category2.jpg';
import category3 from './images/category3.jpg';
import userProfile from './images/user.png';
import upload from './images/upload_area.png';
import fullmodel1 from './images/fullmodel1.jpg';
import fullmodel2 from './images/fullmodel2.jpg';
import fullmodel3 from './images/fullmodel3.jpg';
import fullmodel4 from './images/fullmodel4.jpg';
import formImg from './images/form.jpg';


export const assets = [
    { id : 1 , img : banner1 , quote : "Fashion is art, and style is your personal canvas." },
    { id : 2 , img : banner2 , quote : "Clothes speak louder than words, wear your story." },
    { id : 3 , img : banner3 , quote : "Trends fade fast, but timeless style stays forever" },
    { id : 4 , img : banner4 , quote : "Elegance begins when confidence meets design." },
]

export const mobileassets = [
    { id : 5 , img : banner5 , quote : "Fashion is art, and style is your personal canvas." },
    { id : 6 , img : banner6 , quote : "Clothes speak louder than words, wear your story." },
    { id : 7 , img : banner7 , quote : "Trends fade fast, but timeless style stays forever" },
    { id : 8 , img : banner8 , quote : "Elegance begins when confidence meets design." },
]

export const category = [
    { id : 1 , img : category1 , title : "Sharp | Smart | Simple." },
    { id : 2 , img : category2 , title : "Cool | Casual | Comfort." },
    { id : 3 , img : category3 , title : "Bold | Free | Fun." },
]

export const fullmodel = [
    { id : 1 , img : fullmodel1 , title : 'Men' , category : "menshirt"},
    { id : 2 , img : fullmodel2 , title : 'Shooes' , category : "shooes"},
    { id : 3 , img : fullmodel3 , title : 'Sunglasses' , category : "sunglasses"},
    { id : 4 , img : fullmodel4 , title : 'Women' , category : "womentop"},
]

export const logo = {
    userProfile,
    upload,
    formImg
}