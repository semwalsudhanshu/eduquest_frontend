import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AceEditor from "react-ace";

import axios from "axios";
import "./Editor.css";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";


class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
	lang: 'java',
	lang_for_post:'java',
	desc: '//Welcome to Java Editor',
	selectedOption: 'No',
	isDisabled: true,
	input_text: '',
	output_text: '',
	signal: 'NULL',
	errorType: 'NONE',
	cpuUsage: 0,
	memoryUsage: 0
	
    };
  }


  myChangeHandler = (event) => {
    let val = event.target.value;
    let default_code = '';
    let dummy_lang_for_post;
        if (val === "python")
	{
		default_code = '# Welcome to Python Editor';
		dummy_lang_for_post= "python";
	}
	else if (val === "java")
	{
		default_code = '//Welcome to Java Editor';
		dummy_lang_for_post= "java";
	}
	else if (val === "c")
	{
		default_code = '//Welcome to C Editor';
		dummy_lang_for_post= "c";
		val= "c_cpp";
	}
	else if (val === "cpp")
	{
		default_code = '//Welcome to Cpp Editor';
		dummy_lang_for_post= "cpp";
		val= "c_cpp";
	}
        else ;

    this.setState({desc: default_code, lang:val, lang_for_post:dummy_lang_for_post});
  }


  handleSubmit = (e) => {
    e.preventDefault();

console.log(this.state.lang);
console.log(this.state.desc);

    
    axios.post('http://localhost:5000/task',{
		 lang_for_post: this.state.lang_for_post,
		 desc: this.state.desc,
		 input_text: this.state.input_text
	       }).then((res) => {

			console.log(res.data.stdout);
			if(res.data.exitCode===0)
				this.setState({output_text:res.data.stdout});
			else
				this.setState({output_text:res.data.stderr, errorType:res.data.errorType});

			this.setState({signal:res.data.signal, memoryUsage:res.data.memoryUsage, cpuUsage:res.data.cpuUsage});
				
		});
      

    
  }




  newCode = (newValue) => {this.setState({desc: newValue}); }

  radioChange = (event) => {
    let val = event.currentTarget.value;
    let dummy_disable = true;

    if (val === "Yes") {
	dummy_disable = false;      
    }  


    this.setState({
	selectedOption: val,
	isDisabled: dummy_disable
	});
  }

  inputChange = (event) => {this.setState({input_text: event.target.value});}


  render() {
    return (
		<div className="container editor">
			<br/>

		<div class="row">
    		<div class="col-sm-6">
			<h5> Choose Language:- </h5><br/>

			<form onSubmit = { this.handleSubmit }>
		        <select class="form-control" style={{width:'100px'}} name='lang' onChange={this.myChangeHandler} value={this.state.lang_for_post}>
					<option value="c">C</option>
					<option value="cpp">Cpp</option>
					<option value="java">Java</option>
					<option value="python">Python</option>
				</select>
		
		      <AceEditor
			    mode={this.state.lang}
			    theme="monokai"
			    name="UNIQUE_ID_OF_DIV"
			    fontSize={18}
			    onChange={this.newCode}
			    value={this.state.desc}
			    editorProps={{ $blockScrolling: true }}
			    setOptions={{
			      enableBasicAutocompletion: true,
			      enableLiveAutocompletion: true,
			      enableSnippets: false
			    }}
			  />

					<br/>	
				<h6> Do you wish to give Input?</h6>

				<div class = "form-check form-check-inline">
				<label class="radio-inline">
				<input type="radio" value="Yes" checked={this.state.selectedOption === "Yes"} onChange={this.radioChange}/>Yes
				</label>
				</div>
				<div class = "form-check form-check-inline">
				<label class="radio-inline">
				<input type="radio" value="No" checked={this.state.selectedOption === "No"} onChange={this.radioChange}/>No
				</label>
				</div>
	
					<br/>
					<br/>

				<h5> Input:-</h5>
   				<textarea class="form-control"rows={8} value={this.state.input_text} disabled={this.state.isDisabled} onChange={this.inputChange} />

				<br/>
			
				<input type="submit" class="btn btn-success btn-lg btn-block" value="Run"/>
			</form>
		
				<br/>

			</div>
		


			<div class="col-sm-6">

			<br/><br/><br/><br/>

			<h5> Output:- </h5>

			<textarea class="form-control" rows={10} value={this.state.output_text} readOnly={true}/>

			<br/><br/>

			<h5><u>Output Statistics:-</u></h5>

				<br/>
			
			<h6>Error Type: {this.state.errorType}</h6>
			<h6>Signal: {this.state.signal}</h6>
			<h6>Cpu Usage: {this.state.cpuUsage}</h6>
			<h6>Memory Usage: {this.state.memoryUsage}</h6>

			</div>
		</div>
			
		</div>
    );
  }
}

export default MyForm;





