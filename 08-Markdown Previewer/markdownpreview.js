marked.setOptions({
    breaks: true
  });
  
  class MarkdownPreview extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        input: init
      };
    };
    
    updateInput(input){
      this.setState({input});
    };
    
    render() {
      let result = marked(this.state.input);
      let clean = DOMPurify.sanitize(result);
      return (
        <div id="container">
          <div>
            <h2 class="label">Write Your Markdown Here</h2>
            <textarea id="editor" value={this.state.input} onChange={(inp) => {this.updateInput(inp.target.value);}}></textarea>
          </div>
          <div>
            <h2 class="label">Markdown Preview</h2>
            <div id="preview" dangerouslySetInnerHTML={{ __html: clean}}></div>
          </div>
        </div>
      );
    }
    
  }
  
  const init = `# Markdown previewer 
  ***
  ## You can create headers using number signs (\\#) in front of your text. 
  ### The quantity of number signs define the header level.
  
  You can make your text **bold** or *italic* using asterisks (***also bold AND italic***).
  
  > To create a blockquote, add a \\> in front of a paragraph.
  
  To create an ordered list, add line items with numbers followed by periods (the list should start with number one).
  1. First item
  2. Second item
  
  You can also print \`code\` putting it between backticks, or multi-line code like this:
  \`\`\`
     <html>
      <head>
  \`\`\`
  To quickly turn a URL or email address into a link, enclose it in angle brackets:
  <http://www.duckduckgo.com>
  
  To add an image, add an exclamation mark (!), followed by alt text in brackets, and the path or URL to the image asset in parentheses. You can optionally add a title after the URL in the parentheses.
  
  ![FreeCodeCamp logo](https://design-style-guide.freecodecamp.org/downloads/fcc_primary_small.jpg "FreeCodeCamp logo")
  `
  
  ReactDOM.render(<MarkdownPreview />, document.getElementById('app'));
  