// Presentational Google / GitHub button pair. Click handlers (and whatever
// they pass to authClient.signIn.social) stay owned by the page, since login
// and signup call it with different arguments.

import { Button } from "@/components/ui/button";
import GoogleIcon from "@/components/svgs/GoogleIcon";
import GithubIcon from "@/components/svgs/GithubIcon";
import { authOutlineButtonClass } from "./styles";

export function SocialButtons({
  onGoogleClick,
  onGithubClick,
}: {
  onGoogleClick: () => void;
  onGithubClick: () => void;
}) {
  return (
    <div className="space-y-3">
      <Button
        type="button"
        variant="outline"
        onClick={onGoogleClick}
        className={authOutlineButtonClass}
      >
        <GoogleIcon />
        Continue with Google
      </Button>

      <Button
        type="button"
        variant="outline"
        onClick={onGithubClick}
        className={authOutlineButtonClass}
      >
        <GithubIcon />
        Continue with GitHub
      </Button>
    </div>
  );
}
