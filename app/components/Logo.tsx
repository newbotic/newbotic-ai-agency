import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      {/* Logo Icon - Gradient Square with "N" inside */}
      <div className="relative">
        <div className="w-9 h-9 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 shadow-lg group-hover:shadow-blue-500/30 flex items-center justify-center">
          {/* Litera "N" stilizată */}
          <span className="text-white font-bold text-lg tracking-tight">N</span>
        </div>
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 -z-10"></div>
      </div>
      
      {/* Brand Name */}
      <div className="flex items-baseline">
        <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          NEWBOTIC
        </span>
        <span className="text-xs font-medium ml-1.5 px-1.5 py-0.5 rounded-md bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border border-blue-500/30">
          AI
        </span>
      </div>
    </Link>
  );
}