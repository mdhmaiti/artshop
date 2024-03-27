# artShop documentation.

<!--toc:start-->

- [artShop documentation.](#artshop-documentation)
  - [small points](#small-points)
  - [todos](#todos)
  <!--toc:end-->

## small points

1. max width prose is good for the paragraphs.
2. icons can have property like the lucid props to make it a lucid oicon just spread the props on the custom svg.
3. There is a " use click outside hook " it can be used as a universal hook component for different kind of projects, just use that with the use ref.
4. note : sometimes the 'process.env' does not works as it should natively in the next js to avoid this issue just import the dotenv and use the relative path.
5. In the payload cms the admin comes by the default and some default user collection is already assigned to that but here we are assiginig a custom users collection, So how to do that ? visit the payload.config to know.
6. receiving the server side and client "search params" are two different thing in the next js. The server side process is in the verify email page and the client side is in the sign in page.tsx .

## todos

1. use he cn util for the dynamic classes whenever possible it makes the code reusable it helps to merge the extra things.
2. to use the express or any other framework and deploy it on a custom server other than the vercel see the next util file where the exr handler is defined. and to use express server with the next js just pass the parameter of the app. use req and respose to the next handler.
3. for this app i am using a cms called the payload cms and for its configuration see the payload config.ts and the get payload .ts / it is the minimal set up to start the paylaod ; just assign a editor , assign the port and set up a dtabase ; either postgres or mongo db both are great option.
4. here the dev script in the `package.json` is customed so that when the when i start the server with the npm run dev or the yarn dev the server automatically starts and ' nodemon' package is also added here and it is in the dev mode. If i made any changes in the server it will spin the server again.
   ##################################################################
5. auth flow with the email and the verify email : users -> sign-up page -> verification email-> verify email with the token -> / verify email route -> update the data verify email = true;
6. form implemented by the 'react-hook-forms' , '@hook form resolvers', zod and sonner for the toast, Here I am not using the shad cn because i do not want to use the form code of shad.
   ###############################################################
7. now for the communication of the front end and the backend and also the payload user ( the user can only make a account in the payload after the verification) ; here for the efficient and low cost communication the ` the trpc is used for the efficient communication of the front end and the backend at a low cost`
8. basic dependency for the trpc : '@trpc/client @trpc/server @trpc/next @trpc/react-query ' and aslo install the tanstack query
9. make the trpc client and the trpc index ; trpc client makes the backend like a generic ; here it is the app router type generic which comes from the backend and forwared to the trpc clients;
10. set up the provider.tsx for the trpc and the react query ; and in the fetch part change the property of the credentials to true. this allows effective communication of the cookies etc between the express and the next js.
11. now its time to connect the trpc route to express ; it is like the trpc connected to the express and the express is connected to the trpc. the way to do this is to pass the req and response of the routes to the trpc just like i did that with the next js.
12. now update the server.ts to handle the trpc like this : a request comes to the api/trpc pass it to the express adapter and using the express adapter create a middleware whichhas the context and the appRouter.
13. when a request comes in the express server it forward the request to the next using the trpc express middleware and in the next js api route the next js actually listens to the request in the api folder and let the trpc do its things.
14. now its time to make a api folder with a route like the 'api/trpc'. Here this app is likely to handle different route so the static declaration of the route is point less so the trpc should have a dynamic route like this 'api/trpc/[trpc]/route.ts'.
15. visit the api trpc route for the comments
16. now the set up is complete and when i tested the it works its time to set up other routers inside the trpc;
17. eg: for the auth use the auth router it is mapped in the index
18. this acts like a seperate api end point like the api/trpc/authrouter  
    #####################################################################################
19. check the auth route and you will find that i created a custom collection ' it is not the default collection provided by the payload'
20. the collection schemas comes from the collection folder.
21. we are making the users first. ( check the users file for more description)
22. now the pass the collection to the payload config , to make it visble in the dashboard.
23. now as the user collection is made but custom types are not defined yet; here payload cms provide autp matic type generation using the script
24. all the types will be generate in the payload types and it is defined in the payload comfig;
    w
    ##################################################################
25. Now the basic sign up user backend is complete ; now for the client page just for the submit option in the form just use the mutate and pass the email and password (trpc specific) it will work
26. now as its time for the email verification for this i am using the resend; go to the resend and make an api keyy
27. now in the User collection under the veryfy section return something for the email.
28. here the paylaod automaticcaly generated a token for the user and i can veryfy it using the verifyEmail from the paylaod in the backend and use the trpc to get the things in the client
29. after the verification in the email push the user to the verify email page where it says thank you for the verification and there is also a sign in button.
30. in the database payload will create a property called the verified user is true after this.
31. then the user will be told to sign in and then the user will be given a option to either become a seller or a customer.
32. the session last uing the cookie for the dataflow explanation check the backend for the sign-in in the auth router
33. to understand sign in as a seller or customer logic visit the sign in page.
34. now the user can successlullu sign in but the navbar 'signin / create account ' option does not changes to make the changes have to get the current sessionn from the payload ; which we will get from the paylaod utils it will get us the user in the server side.
35. this payload utils utility is responsible to get the payload token from the cookies and actually decrypt the user and the password from the cookies; and under the hood it is using the jwt authorization
