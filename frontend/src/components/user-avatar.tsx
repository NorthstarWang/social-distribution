import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Author } from "@/types/author";
import Link from "next/link";

interface UserAvatarProps {
  author: Author | null;
  dimension?: number;
  dropdown?: boolean;
}

export function UserAvatar({
  author,
  dimension = 10,
  dropdown = true,
}: UserAvatarProps) {
  if (!author) {
    return null;
  }

  const dimensionStyles = `h-${dimension} w-${dimension}`;

  const handleLogout = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/accounts/logout/`;
  };
  if (dropdown === false) {
    return (
      <Link href={`/profile/${author.username}`}>
        <Avatar className={dimensionStyles}>
          <AvatarImage src={author.profileImage} alt={author.displayName} />
          <AvatarFallback>PFP</AvatarFallback>
        </Avatar>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`relative ${dimensionStyles} rounded-full`}
        >
          <Avatar className={dimensionStyles}>
            <AvatarImage src={author.profileImage} alt={author.displayName} />
            <AvatarFallback>PFP</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {author.displayName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              @{author.username}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Inbox</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
