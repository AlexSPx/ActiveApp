import { Button, ButtonProps } from 'react-native-paper';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { ReactNode } from 'react';

type GoogleButtonProps = {
  onSuccess: (token: string) => void;
  children?: ReactNode;
  loading?: boolean;
} & ButtonProps;

export default function GoogleButton({
  onSuccess,
  loading = false,
  children,
  ...buttonSettings
}: GoogleButtonProps) {
  const handleClick = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn();

      onSuccess((await GoogleSignin.getTokens()).idToken);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
      }
    }
  };

  return (
    <Button
      mode="outlined"
      style={{
        width: '100%',
        marginTop: 16,
        height: 45,
        justifyContent: 'center',
      }}
      loading={loading}
      onPress={handleClick}
      {...buttonSettings}
    >
      {children}
    </Button>
  );
}
