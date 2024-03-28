# Handy Man

An E-commerce app made by :
Hussain Mussa, Baraa Hussein, Weaam Makhoul, Yaseen Hadba

## App Summary

The app that helps people locate skilled workers nearby easily, connects users with trusted professionals in their area, making it simpler to hire someone for tasks or projects. The app aims to solve the problem of finding reliable help quickly and efficiently.

## Running the app using React
navigate to the project repository : "./ECommerce/ecommerce_main_app"
```bash
npm install firebase
npm i react-router-dom
npm install react-phone-input-2 --save
npm i mdb-react-ui-kit
npm i google-libphonenumber
npm start
```

## Code content

**The code is built mainly from 7 pages :**
#### Welcome
 - A simple page that welcomes users to the app presenting a simple interface
#### PhoneAUth
 - The first interactive page with the user, allowing them to log into the app using their phone number, this page is connected to our phone numbers database which authenticates the user.
#### Home
 - The first screen that the user sees upon signing in, shows him the most common jobs that people usually search for, and a Ui search bar allows him to search for any other need the user might want to look for.
#### ShowData
 - A page containing all of our contractors, showing each contractor's elements (name, job, city, rating)
 - Search bar, similar to the one on the home page.
#### DataCard
 - Upon clicking on one of the businesses the user can use this page to get more details about the job such as phone number, rating, location, etc...
 - Users can also leave a review for the business using this page.
#### ProfilePage
 - A personal page for each user connected automatically to his phone number, previewing some information that the user has specified on the User page such as his name, job, and a short bio.
 - If the user happens to be a contractor as well, his job listing is also shown at the bottom.
 - An option to add a job for the user, allowing him to be previewed in the showData as one of the contractors. (this button connects him to the Contractor page)
#### User	
 - Editing environment for each user, allowing him to edit the information shown in the ProfilePage
#### Contractor
 -  This page is directed towards users who want to provide their business throughout the app on the showData page
 



## Features that the app contains

- Search Algorithm

The search bar is a dynamic UI component located on a couple of pages, allowing the user to easily search for the job he requires using a couple of different methods such as name, job, location, or rating
Upon using the search bar the input is sent to Select.jsx mapping the user to the outputs that fit the requirements from the contractors database.

- Phone Number Authentication

Phone number authentication or PhoneAuth for short is a feature that allows us to authenticate each person logging into the app using his phone number. Upon entering his number in the PhoneAuth.jsx page, an SMS message is sent to him containing 6 numbers that are needed to enter, for him to use the app. This feature adds the person to our database allowing us to track our users and preventing bots since **Captcha protects it** login as well, which means that botted users and automated login will be blocked out.

- Databases

 We used the Firestore Database to create all of our databases which are phone numbers, contractors, and users.
	phone numbers: Upon authenticating a phone number the user is added to our phone numbers database which will later be used as a key to the rest of the values for each user such as his rating, his bio, etc ..
	contractors: A database containing all of the business provided by the users in our app, each contractor has a document where we save his name, job, city, phone number, short bio, and rating (which shows how many reviews did he got and what did each reviewer rate him at)
	users: For each user, we save a document that is connected to the phone number that he logged into the app with, containing info that the user might want to show such as his name, job, city, and short bio

- Rating

 Rating is a data element that is specified for each job owner, we allow rating using a simple star system ranging from 1-5, this makes it both simple to review and read by the user. Each rating is tracked using the contractor document, upon setting a certain review by the user in the DataCard page, the Contractor document is updated adding a new review ([phone number] : [rating]). which will later be used to show the total rating the contractor got. 

## Autthors GitHub

[Hussain Mussa](https://github.com/hussainmussa)  
[Baraa Hussein](https://github.com/braahuss)  
[Weaam Makhoul](https://github.com/weammakhoul)  
[Yaseen Hadba](https://github.com/YaseenHadba)
