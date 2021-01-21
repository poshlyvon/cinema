import { PureComponent } from 'react';
import { connect } from 'react-redux';

class Schema extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      bookings: this.props.sessions[this.props.sessionId].bookings,
      bookingSchema: [],
    };
  }

  componentDidMount() {
    const hallMap = [];
    const N = 10

    for (let i = 1; i <= N; i++) {
      for (let j = 1; j <= N; j++) {
        hallMap.push({ row: `${i}`, number: `${j}`, isReserved: false });
      }
    }

    this.setState({
      ...this.state,
      bookingSchema: hallMap.map((item) => {
        if (
          this.state.bookings.find(
            (booking) =>
              booking.row === item.row && booking.number === item.number
          )
        ) {
          return { ...item, isReserved: true };
        }
        return item;
      }),
    });
  }

  changeReservation = async ({ row, number}) => {
    
    this.setState({
      ...this.state,
      bookingSchema: this.state.bookingSchema.map((item) => {
        if (item.row === row && item.number === number) {
          return { ...item, isReserved: !item.isReserved };
        }

        return item;
      }),
    });
  };

  render() {
    return (
      <div className="hall">
        {this.state.bookingSchema.map((item) => (
          <div
            key={`${item.row}-${item.number}`}
            className={item.isReserved ? 'place' : 'place-free'}
            onClick={this.changeReservation.bind(this, item)}
          ></div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ sessions }) => ({ sessions });

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Schema);
