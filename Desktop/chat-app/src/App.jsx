import { useState } from 'react';  
import ReactMarkdown from 'react-markdown';  
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';  
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';  

const App = () => {  
  const [messages, setMessages] = useState([]);  
  const [input, setInput] = useState('');  

  const handleSend = async () => {  
    try{
      if (input.trim() === '' || messages.length >= 5) return;  
  
      const userMessage = { sender: 'user', text: input };  
      const updatedMessages = [...messages, userMessage];  
      setMessages(updatedMessages);  
  
      const response = await fetch('http://localhost:5050/api/v1/chat/completions', {  
        method: 'POST',  
        headers: {  
          'Content-Type': 'application/json',  
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`  
        }, 
         
        body: JSON.stringify({  
          model: 'gpt-3.5-turbo', // Use the appropriate model name  
          messages: updatedMessages  
        }),    
      });  
      if (!response.ok) {  
        throw new Error('Network response was not ok');  
      }  
  
      const data = await response.json();  
      const botMessage = { sender: 'bot', text: data.response };  
      setMessages([...updatedMessages, botMessage]);  
      
      setInput('');  
    } catch(error){
      console.log(error)
    }
    };  

  return (  
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>  
      <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', marginBottom: '10px', height: '400px', overflowY: 'scroll' }}>  
        {messages.map((msg, index) => (  
          <div key={index} style={{ marginBottom: '10px' }}>  
            <strong>{msg.sender}:</strong>  
            <ReactMarkdown  
              components={{  
                code({ inline, className, children, ...props }) {  
                  const match = /language-(\w+)/.exec(className || '');  
                  return !inline && match ? (  
                    <SyntaxHighlighter  
                      style={solarizedlight}  
                      language={match[1]}  
                      PreTag="div"  
                      {...props}  
                    >  
                      {children}  
                    </SyntaxHighlighter>  
                  ) : (  
                    <code className={className} {...props}>  
                      {children}  
                    </code>  
                  );  
                },  
              }}  
            >  
              {msg.text}  
            </ReactMarkdown>  
          </div>  
        ))}  
      </div>  
      <div style={{ display: 'flex' }}>  
        <input  
          type="text"  
          value={input}  
          onChange={(e) => setInput(e.target.value)}  
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}  
          style={{ flexGrow: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}  
        />  
        <button onClick={handleSend} style={{ marginLeft: '10px', padding: '10px', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', border: 'none' }}>  
          Send  
        </button>  
      </div>  
    </div>  
  );  
};  

export default App;