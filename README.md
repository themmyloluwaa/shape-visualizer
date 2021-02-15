# Shape Drawer Web Application.

#### Built by Temiloluwa Philip Ojo

This is a simple web application that allows you select a shape type and it draws the shapes based on the length / radi you input. You can customize the shape by :

- Selecting the fill color
- Selecting the stroke color
- Selecting the stroke width
- Delete all shapes or delete a single shape

##### Shapes can be saved to ensure you have your old shapes upon app reload.

##### To start the project using docker-compose, run docker-compose up --build then subsequently, run docker-compose up.

## Testing


    The shape drawer application tests were written using cypress.io. Cypress is an amazing test automation framework that makes testing javascript application easy and convenient.

    The method of testing employed is component and unit testing considering that create react app works with components rather than pages like Nextjs or Gatsby.

    Component testing is an experimental feature on cypress and it's still in the alpha base but it was the best choice over end to end testing to assert the full functionality of the components.

    To run tests, run
    **npm run cypress:open** or **npm run test**

    This will execute the cypress test runner. Click on the file *All-RUN ME.test.js* this file contains all the test written for the components. Considering that cypress component testing is still at the experimental phase, it was difficult to run all component test at once but this is a workaround.

    You can also run each component test individually.

    After running the test, check the coverage report in coverage/lcov-report/index.html which shows branch coverage of >95%.

    A branch for tests also exist called app/test which was created specifically for writing tests.

_Thank you_
_Yours truly,_
**_The Pounded Yam Lover 😋😋😋_**

###### Connect with me through the following

> Twitter - [CodeKagei](https://twitter.com/themmyloluwaaa)
> Linkedin - [Temiloluwa Philip Ojo](https://www.linkedin.com/in/temiloluwa-ojo/)
> Github [CodeKagei](https://github.com/themmyloluwaa)
> Email [codekagei@gmail.com](codekagei@gmail.com)

[Live Demo https://shape-drawer.vercel.app/](https://shape-drawer.vercel.app/)
