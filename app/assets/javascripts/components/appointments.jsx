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
		this.setState({ 
			appointments: appointments.sort(function(a,b){
				return new Date(a.appt_time) - new Date(b.appt_time);
			}) 
		});


	},


	render: function(){
		return (
			<div>
				<AppointmentForm title={this.state.title} 
					appt_time={this.state.appt_time} 
					onUserInput={this.handleUserInput} 
					onFormSubmit={this.handleFormSubmit}/>
				<AppointmentsList appointments={this.state.appointments} />

			</div>
		)
	}
});
