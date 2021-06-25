# To build a REST api backend with NodeJS/NestJS

- all counters are maintained in memory
- must have a get request to /counters for a list of counters in a map/dictionary format for example: {"abc": 4, "xyz": 3}
- must have a post request to /counters which creates a new counter with an initial value {"counter": initialValue}
- must update (PUT) counter by 1 using put at /counters/:counter, no body is required. If there is no counter in memory this should fail (404 not found)
- must delete counter at /counters/:counter which decreases a counter value by 1, if value <= 0 the counter disappears. Does fail if counter does not exist.
- get request to /counters/:counter returns value of counter in the format {"counter": 5}. The request should fail  if the counter does not exist (404 not found). 

### Bonus

- write your tests using Jest
- AWS Lambda
- DynamoDB

### Developer notes:



#### Component hierarchy:

