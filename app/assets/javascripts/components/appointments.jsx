var Appointments = createReactClass({
	displayName: 'Appointments',
	getInitialState: function(){
		return{
			appointments: this.props.appointments,
			title: 'Team blavlavla',
			appt_time: 'Tomorrow at 9am'

		}
	},


	handleUserInput: function(obj) {
		this.setState(obj)
	},
	handleFormSubmit: function() {
		var appointment = {
			title: this.state.title,
			appt_time: this.state.appt_time
		}
		console.log(appointment)
		$.post('/appointments',
						{appointment: appointment})
					.done(function(data){
						this.addNewAppointment(data)
					}.bind(this));

	},

	addNewAppointment: function(appointment) {
		var appointments = $.extend(true,[],this.state.appointments)
		console.log(appointments)
		appointments.push(appointment)
		this.setState({ appointments: appointments })


	},


	render: function(){
		return (
			<div>
				<AppointmentForm input_title={this.state.title} 
					input_appt_time={this.state.appt_time} 
					onUserInput={this.handleUserInput} 
					onFormSubmit={this.handleFormSubmit}/>
				<AppointmentsList appointments={this.state.appointments} />

			</div>
		)
	}
});
