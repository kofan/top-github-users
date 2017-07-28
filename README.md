# TOP GitHub users with RxJS

The project the main purpose of which is to simply demonstrate how Reactive programming paradigm,
namely [RxJS](https://github.com/ReactiveX/RxJS) library, may be used in order to implement application logic and to solve some common tasks.
The running application screen is:

![Application Screen](https://raw.githubusercontent.com/kofan/top-github-users/master/screen.png)

[Here](https://www.linkedin.com/pulse/reactive-0x2b-nickolay-kofanov) you may read the article explaining some details about Reactive programming.

## Up and running

To build the application you need to have node.js **>= 8.0** installed on you host machine.
To manage multiple versions of node.js I recommend to use [nvm](https://github.com/creationix/nvm).

### Linux / Mac OSX 
Simply run the following command:

```bash
make dev
```

### Windows

Install all the project dependencies first:

```bash
yarn
```
or if your are still using NPM then:

```bash
npm i
```

After dependencies have been successfully installed you may run the application:

```bash
npm run dev
```

## If you do not have node.js **>= 8.0** and don't want to use [nvm](https://github.com/creationix/nvm),
but you still want to see the application in action you may run it with [Docker](https://www.docker.com/) (should be installed). 
You can simply do it using the following script:

```
./run_docker.sh
```

## Open in browser

After all the dependecies have been installed and the application is running you may open it in the browser:

[http://localhost:9000](http://localhost:9000)
