# Lab Test 2a - Comp3133

### Project Overview
This project is a lab test for Comp3133 that is a SpaceX Mission Tracker application. The app retrieves SpaceX launch data from the public SpaceX API and displays it with filtering and a seperate card for details of an individual launch.

There are three main views:
- **Mission List**: Browse all SpaceX launches with a summary of each mission
- **Mission Filter**: Filter missions by launch date and success status of launch and landing 
- **Mission Details**: View information about a specific launch such as flight number, mission name, rocket name, and launch site

#### Installation for Local Development
```bash
npm install
```

#### Development Server
```bash
ng serve
```
Navigate to `http://localhost:4200/` in your browser.

#### Deployment
This project is deployed on Vercel.
https://101464667-lab-test2-comp3133.vercel.app/missionlist