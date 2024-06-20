![bike-rental-service](https://i.ibb.co/kxqRfRd/bike-rental-srvice.jpg)

---

---

# project name: Bike-Rental-Service (backend-project)

---

### live URL here-

---

```
https://bike-rental-service-backend.vercel.app/
```

### github repo URL here-

---

```
https://github.com/pobittra1/bike-rental-service-backend
```

### Used Technologies-

---

1. Typescript
2. mongoose with mongodb
3. express js
4. node js

### also use some packages. like-

---

- ==bcrypt==, ==cors==, ==dotenv==, ==http-status==, ==jsonwebtoken==, ==zod for validation==, ==eslint==, ==prettier== etc.

#### also you can see used technologies from package.json file of this project.

---

![used-technologies](https://i.ibb.co/VjynHtB/used-techlonogies.jpg)

> # 1. How can you setup this project?
>
> > at first, you need to clone this project from my github. that i was already provide in this file. then open this file in your code editior. (recomended to open this file in ==vs code==). after open the file , then you need to checkhing some info in package.json file. check this what i am using here. and finally you need to press command on your terminal. that is ==npm i== .it's for install node_modules folder for precject instruments. setup done.

> # 2. usage of this application-
>
> > in this project, develop some functionality for bike rental services. that means , here admin can create bikes, and users can rental this bike. also admin can rental but i set it to only users can rental those bike. then take return bikes from users, calculate users bike riding time with some dollar. and charge them. that is business logic of bike rentals service owner or admin. also use some authorization & authentication logic. like u

---

> #### 1. admin can create bike
>
> > here two types person. that is admin & users. only admin can create bike. not users. if users try to doing create bike so show error that is "you are not authorize" that means this route only available for ==Admin== .
>
> #### 2. users can rental bike
>
> > in this route only users can rental bikes. also admin can do this but i just do that only users can access this route and rental bikes. one user can rental multiple bikes.

> #### 3. delete bikes
>
> in this route only admin can delete or remove bikes from his/her bike rental service. not for permanently delete causes if i delete this bike for permanently so database consistency should be deprecated. that why i do just soft delete. like isAvailable set it to false.

> #### 4. return rental bikes
>
> in this route admin can take return bikes from users and store their info into another collection like ==ReturnRentalsBike== . for handle his/her business system.

---

# finally-

have some others route to explain. that i was explained in my project vedio. so please you can see this vedio for better live explanation.

Thanks to read❤️.
