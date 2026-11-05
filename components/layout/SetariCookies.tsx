'use client';

// butonul „Setări cookies” din subsol: uita alegerea si reincarca pagina, ca bannerul sa apara din nou
export function SetariCookies({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        try {
          localStorage.removeItem('cookie_consent');
        } catch {}
        window.location.reload();
      }}
    >
      Setări cookies
    </button>
  );
}
