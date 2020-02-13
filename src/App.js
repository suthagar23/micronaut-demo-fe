import React from 'react';

class MicronAutApp extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { 
      name: '',
      isSubmitting: false,
      submitError: null,
      data: null,
    }

    this.onChangeName = this.onChangeName.bind(this);
    this.submitName = this.submitName.bind(this);
  }

  onChangeName(e) {
    const name = e.target.value;
    this.setState({
      name,
    })
  }

  submitName() {
    const { name } = this.state;
    this.setState({
      isSubmitting: true
    })
    fetch(`http://0.0.0.0:8080/welcome/${name}`)
      .then((responseJson) => {
          console.log('Res', responseJson);
          this.setState({ data: responseJson, isSubmitting: false });
      })
      .catch((error) => {
          this.setState({ submitError: 'Unable to complete the submission.'})
          console.log('Error', error)
      });
  }

  render() {
    const { data, submitError } = this.state;
    return (
      <div className="wrapper">
        <div className="title">
          <h2>Micronaut Demo App</h2>
        </div>
        <div className="input-area">
          <label> Enter Your Name </label>
          <input onChange={this.onChangeName} />
          <button onClick={this.submitName}>Submit</button>
        </div>
        {submitError && (
          <div className="error">
            Error : {submitError}
          </div>
        )}
        {data && !submitError && (
          <div className="output-area">
          <label> Output From Server :  </label>
          <label> {data} </label>
        </div>
        )}
      </div>
    )
  }
}

export default React.memo(MicronAutApp);
