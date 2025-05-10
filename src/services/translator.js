const translateText = async (text) => {
  try {
    const response = await fetch('https://api-free.deepl.com/v2/translate', {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${import.meta.env.VITE_DEEPL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: [text],
        target_lang: 'FR',
      }),
    });

    if (!response.ok) {
      throw new Error('Erreur de traduction');
    }

    const data = await response.json();
    return data.translations[0].text;
  } catch (error) {
    console.error('Erreur de traduction:', error);
    // En cas d'erreur, on retourne le texte original
    return text;
  }
};

export const translateQuestion = async (question) => {
  if (!question) return question;

  const translatedQuestion = {
    ...question,
    question: await translateText(question.question),
    correct_answer: await translateText(question.correct_answer),
    incorrect_answers: await Promise.all(
      question.incorrect_answers.map(answer => translateText(answer))
    ),
  };

  return translatedQuestion;
};
