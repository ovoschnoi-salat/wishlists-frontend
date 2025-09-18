import {App} from '@/components/App.tsx';
import {ErrorBoundary} from '@/components/ErrorBoundary.tsx';
import {Button, Snackbar, Text} from "@telegram-apps/telegram-ui";

function ErrorBoundaryError({error}: { error: unknown }) {
  return (
    <Snackbar description={"Unexpected Error"} duration={10_000} onClose={() => {
    }} after={
      <Button>
        Copy
      </Button>
    }>
      <Text>
        {error instanceof Error ? error.message
          : typeof error === 'string' ? error : JSON.stringify(error)
        }
      </Text>
    </Snackbar>

  )
    ;
}

export function Root() {
  return (
    <ErrorBoundary fallback={ErrorBoundaryError}>
      <App/>
    </ErrorBoundary>
  );
}
