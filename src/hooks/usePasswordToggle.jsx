import React, { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const usePasswordToggle = () => {
  const [visible, setVisible] = useState(false);
  const InputType = visible ? "text" : "password";
  const Icon = visible ?
    <VisibilityOffIcon sx={{color:'#666'}} onClick={() => setVisible(!visible)} />
    :
    <VisibilityIcon sx={{color:'#666'}} onClick={() => setVisible(!visible)} />;
  return [InputType,Icon];
}

export default usePasswordToggle