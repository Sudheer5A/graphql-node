# graphql-node

Node application with [GraphQL](https://graphql.org/) integration.
For starting the database connection place your [MongoDB](https://www.mongodb.com/) connection URL in config/key.js

## Installing Docker on EC2

For Amazon Linux 2023, run the following:
```
sudo yum install -y docker
```

Start the Docker service.

```sh
sudo service docker start
```

Add the ec2-user to the docker group so that you can run Docker commands without using sudo.

```sh
sudo usermod -a -G docker ec2-user
```

## Insalling Jenkins on EC2 Instance

Follow the documentation to install Jenkins on EC2: [Jenkins on AWS](https://www.jenkins.io/doc/tutorials/tutorial-for-installing-jenkins-on-AWS/)

## Creating a static Nginx
Moving forward, the subsequent steps are relatively straightforward.

We will confirm the status of our server using the following command:

```sh
sudo systemctl status nginx
```

Then we will start our Nginx server with this command:

```sh
sudo systemctl start nginx
```

Enable the nginx

```sh
sudo systemctl enable nginx
```


