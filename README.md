# modoki-nerdle

This is my first project with React. Yay!<br>
I plan to make something nerdle-like.

※ Please let me know if there are any copyright or other issues. I will remove this.

Demo is [here](https://hazukit0.github.io/modoki-nerdle/).

First of all, I made the front.

## Getting started

This is React project. <br>
Node.js version: 18.4.0

If you want to run it on your pc, as shown below

    cd [project-folder]
    npm install

If you have not installed yarn, it is useful to do so.
https://yarnpkg.com/

    npm install --global yarn


## Server Side Data (Cloud Firestore)
- Answer to the question
```
Data definition
- results
    - yyyymmdd (date)
        - result: String # equation '2*3+5=11'
```
- Game data in play (For export and inport) (Future Work)

## Future Work
- Create the logo
- Color the numeric control panel
- Create a callout for game message
- Pop-up dialog
- Read and save data to local storage
- Statistics function
- Game data export and inport

## Local Storage Data
- Game data in play (For browser reload)
- Statistics data
