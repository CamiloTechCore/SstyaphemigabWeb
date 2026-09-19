import logoImage from '../assets/images/LOGO.png'

function Logo({ compact = false }) {
  return (
    <div className="flex items-center gap-2 select-none">
      <img
        src={logoImage}
        alt="Logo de SST Y APH EMIGAB"
        className="h-10 w-10 shrink-0 object-contain"
      />
      {!compact && (
        <div className="leading-tight">
          <p className="font-extrabold text-navy text-sm tracking-wide">SST Y APH</p>
          <p className="font-bold text-green text-[11px] tracking-widest -mt-0.5">EMIGAB</p>
        </div>
      )}
    </div>
  )
}

export default Logo
