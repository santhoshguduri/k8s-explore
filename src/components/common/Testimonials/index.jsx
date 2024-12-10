import ImageCarousel from '../ImageCarousel';
import User1 from './ReviewUser1.png';
import User2 from './ReviewUser2.png';
import QuoteIcon from './quote-icon.png';
import { Box, Typography, Avatar } from '@mui/material';
import { green } from '@mui/material/colors';
import './styles.scss';

const reviews = [
  {
    name: 'Jenny Wilson',
    occupation: 'Business Administrator',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
    image: User1,
  },
  {
    name: 'Guy Hawkins',
    occupation: 'CEO, AllHub',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
    image: User2,
  },
  {
    name: 'Jenny Hawnkyn',
    occupation: 'CTO, Dextos',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
    image: User1,
  },
  // {
  //   name: 'Alex Wilson',
  //   occupation: 'Technical Lead, ASO',
  //   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
  //   image: User2,
  // },
  {
    name: 'Parker Hawkins',
    occupation: 'CEO, Gemify',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
    image: User1,
  },
  {
    name: 'Barry Hawnkyn',
    occupation: 'CTO, Dextos',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
    image: User2,
  },
];

const OPTIONS = { direction: 'ltr' }

const Testimonials = () => {
    return(
      <Box marginBottom={'40px'}>
        <Typography variant='h3' fontWeight='bold' margin='20px 0px 40px'>
          Real Results from Real Users
        </Typography>
        <ImageCarousel slides={reviews} options={OPTIONS}>
          {reviews.map((review, index) => (
            <Box key={index} className="testimonial-card">
              <Box flex='9 1' padding='12px' width='240px'>

              <Box className="header">
                <Avatar
                  src={review.image}
                  alt="User"
                  className="avatar"
                />
                <Box className="info">
                  <Typography variant="h6" className="name">
                    {review.name}
                  </Typography>
                  <Typography variant="body2" className="occupation">
                    {review.occupation}
                  </Typography>
                </Box>
                
              </Box>
                <Typography variant="body1" className="content">
                    {review.text}
                  </Typography>
                </Box>
              <Box
                component="img"
                src={QuoteIcon}
                alt="Below Section Image"
                sx={{
                  flex: '1 1',
                }}
                />
            </Box>
          ))}
        </ImageCarousel>
      </Box>
    )
}

export default Testimonials;