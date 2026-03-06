import React from "react";
import type { IconProps, IconsMap } from "./types";

import { ReactComponent as AddIcon } from "@shared/assets/icons/add.svg";
import { ReactComponent as ArrowLeftIcon } from "@shared/assets/icons/arrow-left.svg";
import { ReactComponent as ArrowSquareLeftIcon } from "@shared/assets/icons/arrow-square-left.svg";
import { ReactComponent as ArrowSquareRightIcon } from "@shared/assets/icons/arrow-square-right.svg";
import { ReactComponent as BookIcon } from "@shared/assets/icons/book.svg";
import { ReactComponent as BriefcaseIcon } from "@shared/assets/icons/briefcase.svg";
import { ReactComponent as CalendarIcon } from "@shared/assets/icons/calendar.svg";
import { ReactComponent as CheckboxDoneIcon } from "@shared/assets/icons/checkbox-done.svg";
import { ReactComponent as CheckboxEmptyIcon } from "@shared/assets/icons/checkbox-empty.svg";
import { ReactComponent as CheckboxRemoveIcon } from "@shared/assets/icons/checkbox-remove.svg";
import { ReactComponent as ChevronDownIcon } from "@shared/assets/icons/chevron-down.svg";
import { ReactComponent as ChevronRightIcon } from "@shared/assets/icons/chevron-right.svg";
import { ReactComponent as ChevronUpIcon } from "@shared/assets/icons/chevron-up.svg";
import { ReactComponent as ClockIcon } from "@shared/assets/icons/clock.svg";
import { ReactComponent as CountIcon } from "@shared/assets/icons/count.svg";
import { ReactComponent as CrossIcon } from "@shared/assets/icons/cross.svg";
import { ReactComponent as DoneIcon } from "@shared/assets/icons/Done.svg";
import { ReactComponent as EditIcon } from "@shared/assets/icons/edit.svg";
import { ReactComponent as EyeSlashIcon } from "@shared/assets/icons/eye-slash.svg";
import { ReactComponent as EyeIcon } from "@shared/assets/icons/eye.svg";
import { ReactComponent as FilterSquareIcon } from "@shared/assets/icons/filter-square.svg";
import { ReactComponent as GalleryAddIcon } from "@shared/assets/icons/gallery-add.svg";
import { ReactComponent as GalleryEditIcon } from "@shared/assets/icons/gallery-edit.svg";
import { ReactComponent as GlobalIcon } from "@shared/assets/icons/global.svg";
import { ReactComponent as HomeIcon } from "@shared/assets/icons/home.svg";
import { ReactComponent as IdeaIcon } from "@shared/assets/icons/idea.svg";
import { ReactComponent as LifestyleIcon } from "@shared/assets/icons/lifestyle.svg";
import { ReactComponent as LikeIcon } from "@shared/assets/icons/like.svg";
import { ReactComponent as LogoutIcon } from "@shared/assets/icons/logout.svg";
import { ReactComponent as MessageTextIcon } from "@shared/assets/icons/message-text.svg";
import { ReactComponent as MoonIcon } from "@shared/assets/icons/moon.svg";
import { ReactComponent as MoreSquareIcon } from "@shared/assets/icons/more-square.svg";
import { ReactComponent as NotificationIcon } from "@shared/assets/icons/notification.svg";
import { ReactComponent as PalleteIcon } from "@shared/assets/icons/palette.svg";
import { ReactComponent as PlusCircleIcon } from "@shared/assets/icons/plus-circle.svg";
import { ReactComponent as RadioButtonActiveIcon } from "@shared/assets/icons/radiobutton-active.svg";
import { ReactComponent as RadioButtonEmptyIcon } from "@shared/assets/icons/radiobutton-empty.svg";
import { ReactComponent as RequestIcon } from "@shared/assets/icons/request.svg";
import { ReactComponent as ScrollIcon } from "@shared/assets/icons/scroll-1.svg";
import { ReactComponent as ScrollSquareIcon } from "@shared/assets/icons/scroll.svg";
import { ReactComponent as SearchIcon } from "@shared/assets/icons/search.svg";
import { ReactComponent as ShareIcon } from "@shared/assets/icons/share.svg";
import { ReactComponent as SortIcon } from "@shared/assets/icons/sort.svg";
import { ReactComponent as SunIcon } from "@shared/assets/icons/sun.svg";
import { ReactComponent as UserCircleIcon } from "@shared/assets/icons/user-circle.svg";
import { ReactComponent as UserIcon } from "@shared/assets/icons/user.svg";

const icons: IconsMap = {
  add: AddIcon,
  arrowLeft: ArrowLeftIcon,
  arrowSquareLeft: ArrowSquareLeftIcon,
  arrowSquareRight: ArrowSquareRightIcon,
  book: BookIcon,
  briefcase: BriefcaseIcon,
  calendar: CalendarIcon,
  checkboxDone: CheckboxDoneIcon,
  checkboxEmpty: CheckboxEmptyIcon,
  checkboxRemove: CheckboxRemoveIcon,
  chevronDown: ChevronDownIcon,
  chevronRight: ChevronRightIcon,
  chevronUp: ChevronUpIcon,
  clock: ClockIcon,
  count: CountIcon,
  cross: CrossIcon,
  done: DoneIcon,
  edit: EditIcon,
  eyeSlash: EyeSlashIcon,
  eye: EyeIcon,
  filterSquare: FilterSquareIcon,
  galleryAdd: GalleryAddIcon,
  galleryEdit: GalleryEditIcon,
  global: GlobalIcon,
  home: HomeIcon,
  idea: IdeaIcon,
  lifestyle: LifestyleIcon,
  like: LikeIcon,
  logout: LogoutIcon,
  messageText: MessageTextIcon,
  moon: MoonIcon,
  moreSquare: MoreSquareIcon,
  notification: NotificationIcon,
  pallete: PalleteIcon,
  plusCircle: PlusCircleIcon,
  radioButtonActive: RadioButtonActiveIcon,
  radioButtonEmpty: RadioButtonEmptyIcon,
  request: RequestIcon,
  scroll: ScrollIcon,
  scrollSquare: ScrollSquareIcon,
  search: SearchIcon,
  share: ShareIcon,
  sort: SortIcon,
  sun: SunIcon,
  userCircle: UserCircleIcon,
  user: UserIcon,
} as const;

export const IconUI: React.FC<IconProps> = ({
  name,
  size = 24,
  className,
  ...props
}) => {
  const IconComponent = icons[name];
  if (!IconComponent) return null;

  return (
    <IconComponent
      className={className}
      width={size}
      height={size}
      {...props}
    />
  );
};
