const DurenSV = function() {
  class PlayCard {
    constructor(rank, suit, cost) {
      this.$rank = rank;
      this.$suit = suit;
      this.$cost = cost;
    }
  }
  class PlayDeck {
    constructor() {
      this.$deck = [];
    }
    ClearDeck() {
      this.$deck = [];
    }
    get Deck() {
      return this.$deck;
    }
    set Deck(card) {
      this.$deck.push(card);
    }
    LastCard() {
      return this.$deck.pop();
    }
    DelCard(card) {
      for (let i = 0; i < this.$deck.length; i++) {
        if (card === this.$deck[i]) {
          for (let k = i; k < this.$deck.length; k++) {
            this.Deck[k] = this.$deck[k + 1]
          }
          break;
        }
      }
      this.LastCard();
      return card;
    }
  }
  class GetDeck extends PlayDeck {
    constructor(player, opponent) {
      super();
      this.$player = player;
      this.$opponent = opponent;
      this.$turn = 0;
    }
    InsertCards() {
      for (let rank of Ranks) {
        for (let suit of Suits) {
          let cost = this.GetCost(0, rank);
          this.$deck.push(new PlayCard(rank, suit, cost));
        }
      }
    }
    CreateDeck(deck) {
      for (let i = 0; i < deck.length; i++) {
        AddNewDiv("card-back", "card", $("deck"), "");
      }
      AddButton(
        "new-game", "", "button", "Нова гра", $("middle"), "", ""
      );
    }
    GetRank(card) {
      let rank = "";
      let j = 0;
      for (let i = 0; i < card.className.length; i++) {
        if (card.className[i] === "-") {
          j = i + 1;
          break;
        }
        rank += card.className[i];
      }
      return rank;
    }
    GetSuit(card) {
      let suit = "";
      let j = 0;
      for (let i = 0; i < card.className.length; i++) {
        if (card.className[i] === "-") {
          j = i + 1;
          break;
        }
      }
      for (j; j < card.className.length; j++) {
        suit += card.className[j];
      }
      return suit;
    }
    GetCost(cost, rank) {
      switch (rank) {
        case "six":
          cost = 6;
          break;
        case "seven":
          cost = 7;
          break;
        case "eight":
          cost = 8;
          break;
        case "nine":
          cost = 9;
          break;
        case "ten":
          cost = 10;
          break;
        case "jack":
          cost = 11;
          break;
        case "queen":
          cost = 12;
          break;
        case "king":
          cost = 13;
          break;
        case "ace":
          cost = 14;
          break;
      }
      return cost;
    }
    GetFull(card, item) {
      let current;
      let suit = this.GetSuit(card);
      let rank = this.GetRank(card);
      for (let i = 0; i < item.length; i++) {
        if ((item[i].$rank === rank) && (item[i].$suit === suit)) {
          current = item[i];
          break;
        }
      }
      return current;
    }
    GetCard(i, field) {
      return $(field).children[i];
    }
    ShowCard(current, card) {
      card.className = current.$rank + "-" + current.$suit;
    }
    CloseCard(card) {
      card.className = "card-back";
    }
    ShuffleCards() {
      for (let i = 0; i < 1000; i++) {
        let a = Math.floor(Math.random() * this.$deck.length);
        let b = Math.floor(Math.random() * this.$deck.length);
        let c = this.$deck[a];
        this.$deck[a] = this.$deck[b];
        this.$deck[b] = c;
      }
    }
    AddKozir() {
      let kozir = this.DelCard(this.$deck[23]);
      this.$deck.unshift(kozir);
      for (let i = 0; i < this.$deck.length; i++) {
        if (kozir.$suit === this.$deck[i].$suit) {
          this.$deck[i].$cost += 9;
        }
      }
      return kozir;
    }
    GetKozir(kozir, check) {
      let current = $first($("deck"));
      let spot, spotname;
      if (check === true) {
        switch (kozir.$suit) {
          case "hearts":
            spot = "&hearts;", spotname = "Чирва";
            break;
          case "diamonds":
            spot = "&diams;", spotname = "Бубни";
            break;
          case "clubs":
            spot = "&clubs;", spotname = "Хрести";
            break;
          case "spades":
            spot = "&spades;", spotname = "Піки";
            break;
        }
        this.ShowCard(kozir, current);
        current.setAttribute("trump", true);
        let trump = $("kozir-now");
        if (trump) trump.remove();
        AddButton(
          "kozir-now", "", "button", "Козир: " + " " + spot, document.body, "", "");
      } else {
        return;
      }
    }
    FirstTurn() {
      let trumps1 = [], trumps2 = [], result1, result2, index1, index2;
      for (let i = 0; i < this.$opponent.$deck.length; i++) {
        trumps1.push(this.$opponent.$deck[i].$cost);
        console.log(trumps1);
        result1 = parseInt(Math.min.apply(null, trumps1.filter(trump => trump > 14)));
        index1 = trumps1.indexOf(result1);
        return result1;
      }
      for (let k = 0; k < this.$player.$deck.length; k++) {
        trumps2.push(this.$player.$deck[k].$cost);
        result2 = parseInt(Math.min.apply(null, trumps2.filter(trump => trump > 14)));
        index2 = trumps2.indexOf(result2);
        console.log(trumps2);
        return result2;
      }
      if (result1 > result2) {
        this.$turn === 1;
      } else if (result1 < result2) {
        this.$turn === 0;
      } else {
        this.$turn === 0;
      }
      console.log(this.$turn);
    }
    ViewTurn(turn) {
      turn === true 
        ? ($("turn").innerHTML = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 511.843 511.843" xml:space="preserve" width="32px" height="35px" fill="#000000"><g id="SVGRepo_iconCarrier"> <polygon style="fill:#E5E8EC;" points="127.961,251.367 184.443,504.626 327.743,501.3 383.883,248.04 "></polygon> <path style="fill:#F5BA45;" d="M255.922,106.631L255.922,106.631c28.491,0,55.264-11.091,75.398-31.233 C351.47,55.264,362.56,28.483,362.56,0h21.322c0,70.674-57.295,127.961-127.961,127.961l0,0v-21.33H255.922z"></path> <rect x="245.251" y="396.721" style="fill:#424953;" width="21.337" height="46.986"></rect> <rect x="223.242" y="426.521" style="fill:#EC5564;" width="63.98" height="78.1"></rect> <path style="fill:#CBD0D8;" d="M116.604,255.921l55.452,255.922h166.355l55.436-255.922H116.604z M321.199,490.506H189.254 l-46.205-213.247h224.369L321.199,490.506z"></path> <path style="fill:#EC5564;" d="M276.978,120.704c-1.64,10.146-10.466,17.917-21.056,17.917c-10.591,0-19.416-7.771-21.056-17.917 c-39.613,4.14-122.713,24.118-159.53,156.555h361.172C399.691,144.822,316.591,124.844,276.978,120.704z"></path> <path style="fill:#FECD57;" d="M255.233,405.22c-11.762,0-21.337-9.576-21.337-21.338c0-6.795,10.028-22.68,21.337-36.801 c11.309,14.121,21.322,30.006,21.322,36.801C276.557,395.644,266.996,405.22,255.233,405.22z"></path> <path style="fill:#F5BA45;" d="M255.233,330.555c0,0-31.99,35.661-31.99,53.327c0,17.667,14.324,31.99,31.99,31.99 c17.666,0,31.99-14.323,31.99-31.99C287.225,366.216,255.233,330.555,255.233,330.555z M255.233,394.535 c-5.764,0-10.465-4.577-10.653-10.278c0.219-1.031,1.796-6.717,10.653-19.338c8.841,12.621,10.434,18.307,10.652,19.338 C265.699,389.958,260.983,394.535,255.233,394.535z"></path> <g> <path style="fill:#D94452;" d="M429.697,255.46h-35.146v-20.868h27.008c-3.312-7.607-6.811-14.699-10.449-21.322h-59.904v-21.329 h46.611c-5.655-7.966-11.513-15.042-17.526-21.329h-71.743V149.29h47.031c-14.807-10.387-29.631-17.033-43.174-21.329h-38.02 c-3.702,6.365-10.59,10.661-18.463,10.661c-7.873,0-14.761-4.296-18.463-10.661h-38.02c-13.543,4.296-28.366,10.942-43.174,21.329 h45.642v21.322h-70.354c-6.014,6.287-11.871,13.363-17.526,21.329h45.236v21.329h-58.529c-3.64,6.623-7.139,13.715-10.45,21.322 h26.32v20.868H82.146c-2.358,6.764-4.592,13.863-6.686,21.33h360.922C434.289,269.323,432.055,262.224,429.697,255.46z M329.867,191.941v21.329h-63.98v-21.329H329.867z M223.243,149.289h63.98v21.322h-63.98V149.289z M180.586,191.941h63.98v21.329 h-63.98V191.941z M201.906,255.46h-63.98v-20.868h63.98V255.46z M287.225,255.46h-63.98v-20.868h63.98V255.46z M373.214,255.46 h-64.667v-20.868h64.667V255.46z"></path> <path style="fill:#D94452;" d="M255.922,85.309c-17.667,0-31.99,14.324-31.99,31.99c0,17.667,14.324,31.99,31.99,31.99 s31.99-14.323,31.99-31.99C287.911,99.633,273.587,85.309,255.922,85.309z M255.922,127.96c-5.874,0-10.669-4.787-10.669-10.661 c0-5.881,4.795-10.668,10.669-10.668c5.873,0,10.668,4.787,10.668,10.668C266.59,123.173,261.794,127.96,255.922,127.96z"></path> </g> <path style="fill:#FECD57;" d="M255.922,106.631L255.922,106.631c-28.492,0-55.265-11.091-75.399-31.233 C160.372,55.264,149.281,28.483,149.281,0h-21.321c0,70.674,57.295,127.961,127.961,127.961l0,0c5.889,0,10.668-4.771,10.668-10.661 C266.59,111.41,261.811,106.631,255.922,106.631z"></path> </g></svg><p>Ваш хід</p>`, document.querySelector(":root").style.setProperty("--turn", "#66f605"))
        : ($("turn").innerHTML = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 511.843 511.843" xml:space="preserve" width="32px" height="35px" fill="#000000"><g id="SVGRepo_iconCarrier"> <polygon style="fill:#E5E8EC;" points="127.961,251.367 184.443,504.626 327.743,501.3 383.883,248.04 "></polygon> <path style="fill:#F5BA45;" d="M255.922,106.631L255.922,106.631c28.491,0,55.264-11.091,75.398-31.233 C351.47,55.264,362.56,28.483,362.56,0h21.322c0,70.674-57.295,127.961-127.961,127.961l0,0v-21.33H255.922z"></path> <rect x="245.251" y="396.721" style="fill:#424953;" width="21.337" height="46.986"></rect> <rect x="223.242" y="426.521" style="fill:#EC5564;" width="63.98" height="78.1"></rect> <path style="fill:#CBD0D8;" d="M116.604,255.921l55.452,255.922h166.355l55.436-255.922H116.604z M321.199,490.506H189.254 l-46.205-213.247h224.369L321.199,490.506z"></path> <path style="fill:#EC5564;" d="M276.978,120.704c-1.64,10.146-10.466,17.917-21.056,17.917c-10.591,0-19.416-7.771-21.056-17.917 c-39.613,4.14-122.713,24.118-159.53,156.555h361.172C399.691,144.822,316.591,124.844,276.978,120.704z"></path> <path style="fill:#FECD57;" d="M255.233,405.22c-11.762,0-21.337-9.576-21.337-21.338c0-6.795,10.028-22.68,21.337-36.801 c11.309,14.121,21.322,30.006,21.322,36.801C276.557,395.644,266.996,405.22,255.233,405.22z"></path> <path style="fill:#F5BA45;" d="M255.233,330.555c0,0-31.99,35.661-31.99,53.327c0,17.667,14.324,31.99,31.99,31.99 c17.666,0,31.99-14.323,31.99-31.99C287.225,366.216,255.233,330.555,255.233,330.555z M255.233,394.535 c-5.764,0-10.465-4.577-10.653-10.278c0.219-1.031,1.796-6.717,10.653-19.338c8.841,12.621,10.434,18.307,10.652,19.338 C265.699,389.958,260.983,394.535,255.233,394.535z"></path> <g> <path style="fill:#D94452;" d="M429.697,255.46h-35.146v-20.868h27.008c-3.312-7.607-6.811-14.699-10.449-21.322h-59.904v-21.329 h46.611c-5.655-7.966-11.513-15.042-17.526-21.329h-71.743V149.29h47.031c-14.807-10.387-29.631-17.033-43.174-21.329h-38.02 c-3.702,6.365-10.59,10.661-18.463,10.661c-7.873,0-14.761-4.296-18.463-10.661h-38.02c-13.543,4.296-28.366,10.942-43.174,21.329 h45.642v21.322h-70.354c-6.014,6.287-11.871,13.363-17.526,21.329h45.236v21.329h-58.529c-3.64,6.623-7.139,13.715-10.45,21.322 h26.32v20.868H82.146c-2.358,6.764-4.592,13.863-6.686,21.33h360.922C434.289,269.323,432.055,262.224,429.697,255.46z M329.867,191.941v21.329h-63.98v-21.329H329.867z M223.243,149.289h63.98v21.322h-63.98V149.289z M180.586,191.941h63.98v21.329 h-63.98V191.941z M201.906,255.46h-63.98v-20.868h63.98V255.46z M287.225,255.46h-63.98v-20.868h63.98V255.46z M373.214,255.46 h-64.667v-20.868h64.667V255.46z"></path> <path style="fill:#D94452;" d="M255.922,85.309c-17.667,0-31.99,14.324-31.99,31.99c0,17.667,14.324,31.99,31.99,31.99 s31.99-14.323,31.99-31.99C287.911,99.633,273.587,85.309,255.922,85.309z M255.922,127.96c-5.874,0-10.669-4.787-10.669-10.661 c0-5.881,4.795-10.668,10.669-10.668c5.873,0,10.668,4.787,10.668,10.668C266.59,123.173,261.794,127.96,255.922,127.96z"></path> </g> <path style="fill:#FECD57;" d="M255.922,106.631L255.922,106.631c-28.492,0-55.265-11.091-75.399-31.233 C160.372,55.264,149.281,28.483,149.281,0h-21.321c0,70.674,57.295,127.961,127.961,127.961l0,0c5.889,0,10.668-4.771,10.668-10.661 C266.59,111.41,261.811,106.631,255.922,106.631z"></path> </g></svg><p>Хід суперника</p>`, document.querySelector(":root").style.setProperty("--turn", "red"));
    }
    ChangeTurn() {
      this.$turn ? this.$turn = 0 : this.$turn = 1;
    }
    CheckAce() {
      if ((this.$player.$deck.length === 6) && (this.$opponent.$deck.length === 6)) {
        if (this.$deck[23].$rank === "ace") {
          ShowMessage("Інфо", "Туз не може бути козирем! Тасуємо колоду і вибираємо іншу карту.", "verified", "4s");
          setTimeout(() => {
            this.ShuffleCards();
          }, 2500);
        }
      }
    }
    ExitToMenu(check) {
      (check || confirm("Вийти з гри?")) && window.location.reload();
    }
    OpacityCard(card, spot) {
      "easy" === document.documentElement.getAttribute("data-difficult") && (
        spot ?
        (card.style.opacity = "0.15", card.style.top = "10px") :
        (card.style.opacity = "1", card.style.top = "")
      );
    }
    CardPlace(field) {
      let length = $(field).querySelectorAll("div").length;
      for (let i = 0; i < length; i++) {
        $(field).querySelectorAll("div")[i].style.left = `${parseInt(i) * ($(field).clientWidth / (length + 1)) + "px"}`;
      }
    }
    DropCards(check) {
      if (check === true) {
        if (this.$turn === 1) {
          this.DropOnStartPlayer(this.$player, "player");
          this.DropOnStartPlayer(this.$opponent, "opponent");
        } else {
          this.DropOnStartPlayer(this.$opponent, "opponent");
          this.DropOnStartPlayer(this.$player, "player");
        }
      } else {
        if (this.$turn === 1) {
          this.DropCardsPlayer(this.$player);
          this.DropCardsPlayer(this.$opponent);
        } else {
          this.DropCardsPlayer(this.$opponent);
          this.DropCardsPlayer(this.$player);
        }
      }
    }
    DropOnStartPlayer(player, field) {
      let rpt = 6,
        interval = null,
        card;
      interval = setInterval(() => {
        card = this.LastCard();
        player.Deck = card;
        let current = $("deck").children[$("deck").children.length - 1];
        current.remove();
        this.CloseCard(current);
        field === "player" ? (current.setAttribute("anim0", true), setTimeout(() => { current.className = card.$rank + "-" + card.$suit }, 1600)) : (current.setAttribute("anim1", true));
        $insert($(field), current);
        for (let i = 0; i < player.$deck.length; i++) {
          $(field).querySelectorAll("div")[i].style.left = `${parseInt(i) * ($(field).clientWidth / 7) + "px"}`;
        }
        rpt--;
        if (rpt <= 0) {
          clearInterval(interval);
          this.CheckAce();
          setTimeout(() => {
            $("player").querySelectorAll("div").forEach(el => el.removeAttribute("anim0"));
            $("opponent").querySelectorAll("div").forEach(el => el.removeAttribute("anim1"));
            $("player").style.pointerEvents = "auto";
          }, 3000);
        }
      }, 3000);
    }
    DropCardsPlayer(player) {
      let card;
      while ((player.$deck.length < 6) && (this.$deck.length !== 0)) {
        card = this.LastCard();
        player.Deck = card;
      }
      return;
    }
    TakeCardsByHand(item, field) {
      let card = $("deck").children[$("deck").children.length - 1];
      card.remove();
      $insert($(field), card);
      let length = $(field).children.length;
      for (let i = 0; i < length; i++) {
        $(field).className === "player" ?
          (this.ShowCard(item, card), this.CardPlace("player"), card.style.transform = "rotate(0deg)") :
          (this.CloseCard(card), this.CardPlace("opponent"), card.style.transform = "rotate(0deg)");
      }
      if ($("deck").children.length === 1) {
        this.GetKozir($first($("deck")), false);
      }
    }
    TakeCard(name) {
      let card;
      for (let i = $("Attack").children.length - 1; i >= 0; i--) {
        card = $("Attack").children[i];
        card.style.transform = "rotate(0deg)";
        $("Attack").children[i].remove();
        $insert($(name), card);
        $(name).className === "opponent" ?
          (this.CloseCard(card), this.CardPlace("opponent")) :
          this.CardPlace("player");
      }
      for (let k = $("Defend").children.length - 1; k >= 0; k--) {
        card = $("Defend").children[k];
        card.style.transform = "rotate(0deg)";
        $("Defend").children[k].remove();
        $insert($(name), card);
        $(name).className === "opponent" ?
          (this.CloseCard(card), this.CardPlace("opponent")) :
          this.CardPlace("player");
      }
    }
    GameTurn(item, card, field, attk, player) {
      if (player === "opponent") {
        card = $first($(player));
      }
      card.remove();
      $insert($(field), card);
      card.style.top = "";
      let length = $(field).children.length;
      for (let i = 0; i < length; i++) {
        attk === true ?
          (card.style.transform = "rotate(-10deg)") :
          (card.style.transform = "rotate(10deg)");
      }
      this.ShowCard(item, card);
      this.CardPlace(player);
      this.FieldPlace(card, field);
      GetLeft();
    }
    ClearTable() {
      let length;
      length = $("Attack").children.length;
      for (let i = 0; i < length; i++) {
        $first($("Attack")).remove();
      }
      length = $("Defend").children.length;
      for (let i = 0; i < length; i++) {
        $first($("Defend")).remove();
      }
    }
    FieldPlace(current, field) {
      let length = $(field).children.length;
      for (let i = 0; i < length; i++) {
        current = $(field).children[i];
        if (length < 4) {
          current.style.left = `${parseInt(i) * ($(field).clientWidth / 4) + "px"}`;
        }
      }
    }
  }
  class GamePlay {
    constructor(Player, Supernik, Koloda, GameTable) {
      this.gameUser = Player;
      this.gameOppt = Supernik;
      this.gameDeck = Koloda;
      this.gameStil = GameTable;
    }
    ToMenu(check) {
      this.gameDeck.ExitToMenu(check);
    }
    CheckTurn() {
      if (this.gameDeck.$turn) {
        return this.gameUser;
      }
      return this.gameOppt;
    }
    ChangeTurn() {
      this.gameDeck.ChangeTurn();
      if (this.gameDeck.$turn === 1) {
        this.gameDeck.ViewTurn(true);
      } else {
        this.gameDeck.ViewTurn(false);
      }
    }
    Wasted() {
      if ((this.gameDeck.$deck.length === 0) && (this.gameOppt.$deck.length === 0 || this.gameUser.$deck.length === 0)) {
        if (this.gameOppt.$deck.length === 0) {
          ShowMessage(
            "Програш!", "На жаль, Ви програли😔", "error", "4s"
          );
        } else {
          ShowMessage(
            "Успіх!", "Ви виграли🙂", "success", "4s"
          );
        }
        setTimeout(() => {
          this.ToMenu(true)
        }, 4000);
        return true;
      }
      return false;
    }
    DropCards() {
      let p1 = this.gameUser.$deck.length;
      let s1 = this.gameOppt.$deck.length;
      this.gameDeck.DropCards(false);
      let p2 = this.gameUser.$deck.length;
      let s2 = this.gameOppt.$deck.length;
      this.DropCardsPlayer(this.gameUser, "player", p1, p2);
      this.DropCardsPlayer(this.gameOppt, "opponent", s1, s2);
    }
    DropCardsPlayer(Player, field, p1, p2) {
      for (let i = p1; i < p2; i++) {
        let card = Player.$deck[i];
        this.gameDeck.TakeCardsByHand(card, field);
      }
    }
    TakeCardPlayer(player, name) {
      this.TakeCard(player, name);
      if (this.Wasted()) {
        return;
      }
      HideElement($("Take"));
      this.EnemyAttack();
    }
    TakeCard(Player, name) {
      this.OpacityCard();
      Player.TakeCard(Player.$deck);
      this.gameDeck.TakeCard(name);
      this.DropCards();
      ShowMessage("Інфо", "Забрано", "verified", "3s");
    }
    OpacityCard() {
      let Card, card, flag, cardAttackCard, AttackCard;
      for (let i = 0; i < this.gameUser.$deck.length; i++) {
        card = this.gameDeck.GetCard(i, "player");
        Card = this.gameUser.$deck[i];
        if (this.gameDeck.$turn === 1) {
          if (this.gameUser.CheckContinueTurn()) {
            flag = this.gameUser.CheckCardAttack(Card);
          } else {
            flag = false;
          }
        } else {
          cardAttackCard = this.gameDeck.GetCard(this.gameStil.$attack.length - 1, "Attack");
          AttackCard = this.gameDeck.GetFull(cardAttackCard, this.gameStil.$attack);
          flag = this.gameUser.CheckCardDefend(Card, AttackCard);
          if (this.gameStil.$attack.length === this.gameStil.$defend.length) {
            flag = false;
          }
        }
        if (flag !== true) {
          this.gameDeck.OpacityCard(card, true);
        } else {
          this.gameDeck.OpacityCard(card, false);
        }
      }
    }
    PassCardPlayer(player) {
      this.PassCard(player);
      if (this.Wasted()) {
        return;
      }
      HideElement($("Pass"));
      this.EnemyAttack();
    }
    PassCard(Player) {
      Player.Pass();
      this.gameStil.ClearTable();
      this.gameDeck.ClearTable();
      if (($("player").children.length !== 0) || $("opponent").children.length !== 0) {
        this.DropCards();
        ShowMessage("Інфо", "Відбій", "verified", "3s");
      } else {}
      this.ChangeTurn();
    }
    Stop() {
      this.gameUser.sideturn = 0;
      this.TakeCard(this.gameOppt, "opponent");
      HideElement($("Stop"));
      HideElement($("Pass"));
      this.OpacityCard();
    }
    EnemyAttack() {
      let current = null;
      current = this.gameOppt.EnemyAttack();
      if (current !== null) {
        ShowElement($("Take"));
        this.gameDeck.GameTurn(current, null, "Attack", true, "opponent");
      } else {
        this.PassCard(this.gameOppt);
        HideElement($("Take"));
      }
      this.OpacityCard();
      this.gameDeck.CardPlace("player");
    }
    EnemyDefend(AttackCard) {
      let current, card;
      if (this.gameUser.sideturn === 0) {
        current = this.gameOppt.EnemyDefend(AttackCard);
      }
      if (current !== null) {
        this.gameDeck.GameTurn(current, card, "Defend", false, "opponent");
        this.OpacityCard();
      } else {
        if (this.Wasted()) {
          return;
        }
        ShowElement($("Stop"));
        HideElement($("Pass"));
        this.gameUser.sideturn = 1;
        return;
      }
    }
    PlayerAttack(current, card) {
      let check = false;
      ShowElement($("Pass"));
      if (this.gameUser.CheckContinueTurn()) {
        check = this.gameUser.CheckCardAttack(current);
        if (check) {
          this.gameDeck.OpacityCard(card, false);
          this.gameUser.Attack(current);
          this.gameDeck.GameTurn(current, card, "Attack", true, "player");
          this.OpacityCard();
        }
      }
      return check;
    }
    PlayerDefend(current, card) {
      let index = this.gameStil.$defend.length;
      let AttackCard = this.gameStil.$attack[index];
      let check = this.gameUser.CheckCardDefend(current, AttackCard);
      if (check) {
        this.gameUser.Defend(current);
        this.gameDeck.GameTurn(current, card, "Defend", false, "player");
      }
      return check;
    }
    ProcessingTurn(current, card) {
      let AttackPlayer = this.CheckTurn();
      if (AttackPlayer === this.gameUser) {
        let check = this.PlayerAttack(current, card);
        if (check) {
          if (this.Wasted()) {
            return;
          }
          this.EnemyDefend(current);
        }
      } else {
        let check = this.PlayerDefend(current, card);
        if (check) {
          if (this.Wasted()) {
            return;
          }
          this.EnemyAttack();
        }
      }
    }
    LoadGamePage() {
      Names();
      $("btn-menu").remove();
      $("logo-box").remove();
      $("logo").remove();
      AddNewDiv("turn", "", $("header"), "");
      $insert($("header"), $("ToMenu"));
      ShowElement($("ToMenu"));
      document.querySelector(":root").style.setProperty("--body-color", "#2a7f62");
      document.querySelector(":root").style.setProperty("--hr-border", "#0B3210A6");
      this.gameDeck.InsertCards();
      this.gameDeck.ShuffleCards();
      this.gameDeck.CreateDeck(this.gameDeck.$deck);
      $("new-game").onclick = (event) => {
        let btn = event.currentTarget;
        btn.remove();
        Engine.StartGame();
      }
    }
    StartGame() {
      ShowMessage("Інфо", "Починаємо нову гру", "success", "4s");
      ShowElement($("user"));
      ShowElement($("enemy"));
      this.gameDeck.DropCards(true);
      $("player").style.pointerEvents = "none";
      let kozir = this.gameDeck.AddKozir();
      this.gameDeck.GetKozir(kozir, true);
      setTimeout(() => {
        this.gameDeck.FirstTurn();
        let check = this.CheckTurn();
        if (check === this.gameOppt) {
          this.EnemyAttack();
          ShowElement($("Take"));
        } else {
          this.EnemyDefend();
          ShowElement($("Pass"));
        }
        if (this.gameDeck.$turn === 1) {
          this.gameDeck.ViewTurn(true);
        } else {
          this.gameDeck.ViewTurn(false);
        }
      }, 22000)
      return;
    }
  }
  class InitUser extends PlayDeck {
    constructor(stil, supernik) {
      super();
      this.$stil = stil;
      this.$supernik = supernik;
      this.sideturn = 0;
    }
    set Table(stil) {
      this.$stil = stil;
    }
    set Enemy(supernik) {
      this.$supernik = supernik;
    }
    Attack(current) {
      this.GameTurn(current, true);
    }
    Defend(current) {
      this.GameTurn(current, false);
    }
    GameTurn(card, attk) {
      this.DelCard(card);
      attk ? this.$stil.attack = card : this.$stil.defend = card;
    }
    CheckContinueTurn() {
      if ((this.$supernik.$deck.length !== 0) && (this.$stil.$attack.length < 6) && (this.$supernik.$deck.length + this.$stil.$defend.length > this.$stil.$attack.length)) {
        return true;
      }
      return false;
    }
    CheckCardAttack(current) {
      if (this.$stil.$attack.length !== 0) {
        for (let i = 0; i < this.$stil.$attack.length; i++) {
          if (current.$rank === this.$stil.$attack[i].$rank) {
            return true;
          }
        }
      } else {
        return true;
      }
      if (this.$stil.$defend.length !== 0) {
        for (let i = 0; i < this.$stil.$defend.length; i++) {
          if (current.$rank === this.$stil.$defend[i].$rank) {
            return true;
          }
        }
      }
      return false;
    }
    CheckCardDefend(current, attkCard) {
      for (let i = 0; i < this.$stil.$attack.length; i++) {
        if (this.$stil.$attack[i] === attkCard) {
          if (current.$cost > attkCard.$cost) {
            if (current.$cost > 14) {
              return true;
            } else if (current.$suit === attkCard.$suit) {
              return true;
            }
          }
        }
      }
      return false;
    }
    TakeCard(player) {
      while (this.$stil.$attack.length !== 0) {
        let card = this.$stil.$attack.pop();
        player.push(card);
      }
      while (this.$stil.$defend.length !== 0) {
        let card = this.$stil.$defend.pop();
        player.push(card);
      }
      return false;
    }
    Pass() {
      while (this.$stil.$attack.length !== 0) {
        let card = this.$stil.$attack.pop();
      }
      while (this.$stil.$defend.length !== 0) {
        let card = this.$stil.$defend.pop();
      }
      return true;
    }
  }
  class InitEnemy extends InitUser {
    EnemyAttack() {
      let current = null;
      if (this.CheckContinueTurn()) {
        let minCardCost = 30;
        for (let i = 0; i < this.$deck.length; i++) {
          if (minCardCost > this.$deck[i].$cost) {
            if (
              this.CheckCardAttack(this.$deck[i]) === true || this.$stil.$attack.length === 0
            ) {
              minCardCost = this.$deck[i].$cost;
              current = this.$deck[i];
            }
          }
        }
        if (current !== null) {
          this.Attack(current);
        }
      }
      return current;
    }
    EnemyDefend(attkCard) {
      let minCardCost = 30;
      let current = null;
      for (let i = 0; i < this.$deck.length; i++) {
        if (this.CheckCardDefend(this.$deck[i], attkCard) === true) {
          if (minCardCost > this.$deck[i].$cost) {
            minCardCost = this.$deck[i].$cost;
            current = this.$deck[i];
          }
        }
      }
      if (minCardCost !== 30) {
        this.Defend(current, attkCard);
        return current;
      }
      return current;
    }
  }
  class MainTable {
    constructor(opponent, player) {
      this.$opponent = opponent;
      this.$player = player;
      this.$attack = [];
      this.$defend = [];
    }
    set opponent(opponent) {
      this.$opponent = opponent;
    }
    set player(player) {
      this.$player = player;
    }
    set attack(card) {
      this.$attack.push(card);
    }
    set defend(card) {
      this.$defend.push(card);
    }
    ClearTable() {
      for (let i = 0; i < this.$defend.length; i++) {
        this.$defend.pop();
      }
      for (let i = 0; i < this.$attack.length; i++) {
        this.$attack.pop();
      }
    }
  }
  let Player = new InitUser();
  let Supernik = new InitEnemy();
  let Koloda = new GetDeck(Player, Supernik);
  let GameTable = new MainTable();
  let Engine = new GamePlay(Player, Supernik, Koloda, GameTable);
  GameTable.Supernik = Supernik;
  GameTable.Player = Player;
  Player.Table = GameTable;
  Player.Enemy = Supernik;
  Supernik.Table = GameTable;
  Supernik.Enemy = Player;
  let BtnTake = $("Take");
  let BtnMenu = $("ToMenu");
  let BtnPass = $("Pass");
  let BtnStop = $("Stop");
  document.addEventListener("click", event => {
    if ((event.target.id === "card") && (event.target.offsetParent !== null)) {
      if (event.target.offsetParent.className === "player") {
        let card = Koloda.GetFull(event.target, Player.$deck);
        Engine.ProcessingTurn(card, event.target);
      }
    }
  });
  BtnTake.onclick = () => { Engine.TakeCardPlayer(Player, "player") }
  BtnMenu.onclick = () => { Engine.ToMenu() }
  BtnPass.onclick = () => { Engine.PassCardPlayer(Player) }
  BtnStop.onclick = () => { Engine.Stop() }
  $("start").onclick = () => { 
    TogglePane()
    Engine.LoadGamePage(); }
}
window.onload = DurenSV()
