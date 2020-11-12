Models

No dependencies:

User:
firstName
lastName !null
email !null, unique
hashedPassword

Topic:
name !null, unique

Question:
userId
topicId
public (boolean)
