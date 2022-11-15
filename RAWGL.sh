#!/bin/bash

if [ -d "/opt/system/Tools/PortMaster/" ]; then
  controlfolder="/opt/system/Tools/PortMaster"
elif [ -d "/opt/tools/PortMaster/" ]; then
  controlfolder="/opt/tools/PortMaster"
else
  controlfolder="/roms/ports/PortMaster"
fi

source $controlfolder/control.txt

get_controls

GAMEDIR="/$directory/ports/rawgl"
cd $GAMEDIR

$ESUDO chmod 666 /dev/tty1
$ESUDO $controlfolder/oga_controls rawgl $param_device &
if [[ $LOWRES == "Y" ]]; then
  rawgl_screen="--window=480x320"
elif [[ -e "/dev/input/by-path/platform-odroidgo3-joypad-event-joystick" ]]; then
  rawgl_screen="--window=854x480"
else
  rawgl_screen="--window=640x480"
fi
LD_LIBRARY_PATH="$GAMEDIR/libs:$LD_LIBRARY_PATH" SDL_GAMECONTROLLERCONFIG="$sdl_controllerconfig" ./rawgl $rawgl_screen --render=software --datapath="$GAMEDIR/gamedata" --language=us 2>&1 | tee $GAMEDIR/log.txt
$ESUDO kill -9 $(pidof oga_controls)
$ESUDO systemctl restart oga_events &
printf "\033c" >> /dev/tty1

