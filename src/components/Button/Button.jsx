import PropTypes from 'prop-types';
import { BtnBox, Btn } from './Button.styled';

export const Button = ({ onClick }) => {
    return <BtnBox>
        <Btn type="button" onClick={onClick}>
        Load more
        </Btn>
        </BtnBox>
}

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
}