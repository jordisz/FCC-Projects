const sounds=[
  {key: "Q",
   name: "Closed Hat",
   sound: "https://raw.githubusercontent.com/jordisz/FCC-Projects/master/09-Drum%20Machine/sounds/HatClosed.mp3"
  },
  {key: "W",
   name: "Open Hat",
   sound: "https://raw.githubusercontent.com/jordisz/FCC-Projects/master/09-Drum%20Machine/sounds/HatOpen.mp3"
  },
  {key: "E",
   name: "Ride",
   sound: "https://raw.githubusercontent.com/jordisz/FCC-Projects/master/09-Drum%20Machine/sounds/Ride.mp3"
  },
  {key: "A",
   name: "Tom",
   sound: "https://raw.githubusercontent.com/jordisz/FCC-Projects/master/09-Drum%20Machine/sounds/Tom.mp3"
  },
  {key: "S",
   name: "Tom 2",
   sound: "https://raw.githubusercontent.com/jordisz/FCC-Projects/master/09-Drum%20Machine/sounds/Tom2.mp3"
  },
  {key: "D",
   name: "Cowbell",
   sound: "https://raw.githubusercontent.com/jordisz/FCC-Projects/master/09-Drum%20Machine/sounds/Cowbell.mp3"
  },
  {key: "Z",
   name: "Kick",
   sound: "https://raw.githubusercontent.com/jordisz/FCC-Projects/master/09-Drum%20Machine/sounds/Kick.mp3"
  },
  {key: "X",
   name: "Clap",
   sound: "https://raw.githubusercontent.com/jordisz/FCC-Projects/master/09-Drum%20Machine/sounds/Clap.mp3"
  },
  {key: "C",
   name: "Snare",
   sound: "https://raw.githubusercontent.com/jordisz/FCC-Projects/master/09-Drum%20Machine/sounds/Snare.mp3"
  }]

class DrumMachine extends React.Component {
   constructor(props){
    super(props);
    this.state = {
      display: "Click or Press Key"
    }
   }
  
  handleDisplay = display => this.setState({ display });
  
  render(){
    return(
      <div id="machine">
        <div id="display">{this.state.display}</div>
        <div id="padboard">
          {sounds.map(sound => (
            <Pad 
              text={sound.name} 
              letter={sound.key} 
              src={sound.sound}
              handleDisplay={this.handleDisplay}
             />
          ))}
        </div>
       </div>
    );
  }
}
 
class Pad extends React.Component {
   componentDidMount() {
      window.focus();
      document.addEventListener("keydown", this.handleKeyDown);
      document.addEventListener("keyup", this.handleKeyUp);
    };
   componentWillUnmount() {
      document.removeEventListener("keydown", this.handleKeyDown);
      document.addEventListener("keyup", this.handleKeyUp);
    };
   handleKeyUp = e => {
      if(e.keyCode === this.props.letter.charCodeAt()){
        let p = document.getElementById(this.props.letter);
        p.parentNode.classList.remove("active"); 
      };  
   };
   handleKeyDown = e => {
      if(e.keyCode === this.props.letter.charCodeAt()){
        let p = document.getElementById(this.props.letter);
        p.parentNode.classList.add("active");
        this.audio.play();
        this.audio.currentTime = 0;
        this.props.handleDisplay(this.props.text);
    };
  };
   handleClick = () => {
      this.audio.play();
      this.audio.currentTime = 0;
      this.props.handleDisplay(this.props.text);
    }
   render() {
    return(
    <div className="drum-pad" id={this.props.text} onClick={this.handleClick}>
        {this.props.letter}
        <audio ref={ref => this.audio = ref} className="clip" id={this.props.letter} src={this.props.src}></audio>
    </div>
    )     
   } 
  }

ReactDOM.render(<DrumMachine/>, document.getElementById("drum-machine"));