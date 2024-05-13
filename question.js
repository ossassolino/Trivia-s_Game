class Question{

    constructor(data){
      this.data = data;
      console.log(this.data);
      this.difficulty = this.data.difficulty;
      this.category = this.data.category;
      this.question = this.data.question;
    
      let ans = [];
      ans = this.data.incorrect_answers;
      ans.push(this.data.correct_answer);
      this.answers = shuffle(ans);
    }
  
    
    
    verifyAnswer(res){
      this.result = (res=='c0');
    }

    getQuestion(){
      return this.question;
    }

    getAnswers(){
      return this.answers;
    }
  }
  
  let dq;
  
  //acquisizione domande fatta solo con json preesistente perchè dopo lunghi tentativi a cercare l'errore ho scoperto che l'api mi ha bannato a causa di troppi tentativi di accesso e non vuole ridarmi il permesso per testare il mio programma
  async function acquireData(cat = -1){
    //domande con api
    let url = "https://opentdb.com/api.php?amount=1";
    if (cat != -1){
      url += "&category="+cat;
    }
    //const response = await fetch(url);
    //const json = (await response.json()).results[0];
    //console.log(data);

    //domande senza api
    const json = ({"response_code":0,"results":[{"type":"boolean","difficulty":"medium","category":"Entertainment: Comics","question":"In the webcomic Homestuck, the first character introduced is Dave Strider.","correct_answer":"False","incorrect_answers":["True"]}]});
    
    let data = json.results[0];
    return data;
  } 


  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }


  /*async function getQuiz(cat = -1) {
    let url = "https://opentdb.com/api.php?amount=1";
    if (cat != -1){
      url += "&category="+cat;
    }
    //const response = await fetch(url);
    //const quiz = (await response.json()).results[0];
    const quiz = ('{"response_code":0,"results":[{"type":"multiple","difficulty":"easy","category":"Entertainment: Film","question":"Which of the following is not the name of a &quot;Bond Girl&quot;? ","correct_answer":"Vanessa Kensington","incorrect_answers":["Pam Bouvier","Mary Goodnight","Wai Lin"]}]}');
    dq = quiz.results[0];
    return dq;
  }*/
 
  
  
  function onClick(){
    dq.verifyAnswer(document.quiz.answer.value);
  }
  
  export {Question, acquireData};