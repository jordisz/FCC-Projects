class RandomQuote extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        quote: "",
        author: ""
      };
    };
    
    componentDidMount() {
      this.getQuote();
    }

    getQuote() {
      let url="https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
      axios.get(url)
        .then(res => {
          let quotes = res.data.quotes;
          let index = Math.floor(Math.random() * quotes.length)
          let randomQuote = quotes[index];
          
          this.setState({
            quote: randomQuote.quote,
            author: randomQuote.author
          })
      })
    }  
    
    newQuote = () => {
      this.getQuote();
    }
    
    render() {
      const {quote, author} = this.state
      return (
        <div id="quote-box">
        <p id="text">"{quote}"</p>
        <p id="author">- {author}</p>
        <div id="buttons">
          <button id="new-quote" onClick={this.newQuote}>NEW QUOTE</button>
          <button><a id="tweet-quote" href={`https://twitter.com/intent/tweet?text=${quote} ${author}`} target='_blank'>TWEET QUOTE</a></button>
        </div>
      </div>
      );
    }
  }
  
  ReactDOM.render(<RandomQuote />, document.getElementById('app'));