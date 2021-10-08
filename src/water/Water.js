import React, { useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
} from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'

import Plant from '../plant/Plant'

const Water = ({plant}) => {
  const [open, setOpen] = useState(false)

  const handleWateredConfirmationOpen = () => setOpen(true)
  const handleWateredConfirmationClose = () => setOpen(false)

  const handleWateredConfirmed = () => handleWateredConfirmationClose()

  return (
    <>
      <h1>Water time 💧</h1>

      <Plant plant={plant} />

      <IconButton onClick={handleWateredConfirmationOpen}>
        <CheckCircleIcon />
      </IconButton>
      <Dialog
          open={open}
          onClose={handleWateredConfirmationClose}
        >
          <DialogContent>
            <p className="water-confirmation">Watered?</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleWateredConfirmationClose}>No</Button>
            <Button onClick={handleWateredConfirmed}>Yes</Button>
          </DialogActions>
        </Dialog>
    </>
  )
}

export default Water
