import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="relative">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 shadow-lg"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
      </div>
      <span className="text-xl font-bold tracking-tight">
        NEWBOTIC
        <span className="text-blue-400 text-xs ml-1.5 font-normal">AI</span>
      </span>
    </Link>
  );
}