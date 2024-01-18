# Notify nexus

**Github Link** - ***https://pijush.grameenphone.com/mcms/notify-nexus.git***

# Technologies
 - [Node.js]
 - [Nest.js]
 - [TypeScript]
 - [Cassandra]

## Installation :zap:

## Setup Docker Commons
Docker Commons consists some common services configured to run via docker scripts to use centrally for applications in local development.
 - Clone Docker Commons.
 ```bash
  git clone https://github.com/a-h-abid/docker-commons.git
 ```
 - We might not need all the services so remove the services we will not need.
 - Be sure to create a docker network:
 ```bash
  docker network create common-net
 ```
 **1. Clone this repo by running the following command :-**
 ```bash
  git clone https://pijush.grameenphone.com/mcms/notify-nexus.git
 ```
 **2. Setting up the databases :-**
 Cassandra
 We need to create table in Cassandra.
 - subscribed_topics table creation
 ```bash
  CREATE TABLE IF NOT EXISTS notificationservice.subscribed_topics (
  msisdn varchar,
  channel varchar,
  channel_id int,
  producer TEXT,
  topic_id int,
  topic varchar,
  type varchar,
  status tinyint,
  PRIMARY KEY ((msisdn, type), producer, channel_id, topic)
  );
 ```
 - Run the query to insert data
 ```bash
 insert into subscribed_topics(msisdn, producer, channel, topic, type, status) values (88017XXXXXXXX, "cmp", "mygp",topic one", "whitelist", 1);
 ```

 ## Setting up Notify nexus & Subscription manager
 - Rename docker/.envs/notify-nexus.example.env to docker/.envs/notify-nexus.env file:
 - Rename docker/.envs/subscription-manager.example.env to docker/.envs/subscription-manager.env file:

 Navigate to docker and run:
 - docker-compose build --no-cache
 - docker-compose watch
 - docker-compose up -d

 To see the log : 
 - docker-compose logs -f notify-nexus
 - docker-compose logs -f subscription-manager
   
 **Open your browser and go to  `https://localhost:443/api/v1/status`**
 
