{
  Class:
    {
      id,
      name,
      createdAt,
      updatedAt,
      quality,
      description,
      decks: [
        id,
        classId,
        name,
        cards: [
          id,
          deckId,
          histories: [
            {
              id,
              cardId,
              confidenceLevel
            }
          ]
        ]
      ]
    }
}
