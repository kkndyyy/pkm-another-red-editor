export type DebugKind = "debug" | "pokemon" | "battle" | "battle_pokemon";

export interface DebugItem {
  id: string;
  kind: DebugKind;
  parent: string;
  en: string;
  ko: string;
  descEn?: string;
  descKo?: string;
}

export const DEBUG_KIND_KO: Record<DebugKind, string> = {
  debug: "F9 디버그",
  pokemon: "포켓몬 디버그",
  battle: "배틀 디버그",
  battle_pokemon: "배틀 포켓몬",
};

export const DEBUG_GROUP_KO: Record<string, string> = {
  main: "메인",
  field_menu: "필드 설정",
  battle_menu: "배틀 설정",
  pokemon_menu: "포켓몬 설정",
  shadow_pokemon_menu: "그림자 포켓몬",
  items_menu: "도구 설정",
  player_menu: "플레이어 설정",
  pbs_editors_menu: "PBS 편집",
  editors_menu: "기타 편집",
  files_menu: "파일 설정",
  hp_status_menu: "HP/상태",
  level_stats: "레벨/능력치",
  contest_stats: "콘테스트 능력",
  moves: "기술",
  species_and_form: "종족/폼",
  cosmetic: "외형",
  ownership: "어버이",
  shadow_pkmn: "그림자 포켓몬",
  battlers: "배틀러",
  trainers: "트레이너",
  field: "필드 효과",
};

export const DEBUG_ITEMS: DebugItem[] = [
  { id: "field_menu", kind: "debug", parent: "main", en: "Field options...", ko: "필드 설정...", descEn: "Warp to maps, edit switches/variables, use the PC, edit Day Care, etc.", descKo: "맵 이동, 스위치/변수, PC, 키우미집 등을 다룹니다." },
  { id: "warp", kind: "debug", parent: "field_menu", en: "Warp to map", ko: "맵으로 이동", descEn: "Instantly warp to another map of your choice.", descKo: "선택한 맵의 통행 가능한 칸으로 즉시 이동합니다." },
  { id: "use_pc", kind: "debug", parent: "field_menu", en: "Use PC", ko: "PC 사용", descEn: "Use a PC to access Pokémon storage and player's PC.", descKo: "포켓몬 보관함과 플레이어 PC를 엽니다." },
  { id: "switches", kind: "debug", parent: "field_menu", en: "Switches", ko: "스위치", descEn: "Edit all Game Switches (except Script Switches).", descKo: "스크립트 스위치를 제외한 게임 스위치를 고칩니다." },
  { id: "variables", kind: "debug", parent: "field_menu", en: "Variables", ko: "변수", descEn: "Edit all Game Variables. Can set them to numbers or text.", descKo: "게임 변수를 숫자나 텍스트로 고칩니다." },
  { id: "safari_zone_and_bug_contest", kind: "debug", parent: "field_menu", en: "Safari Zone and Bug-Catching Contest", ko: "사파리존·곤충채집", descEn: "Edit steps/time remaining and number of usable Poké Balls.", descKo: "남은 걸음/시간과 사용 가능한 볼 개수를 고칩니다." },
  { id: "edit_field_effects", kind: "debug", parent: "field_menu", en: "Change field effects", ko: "필드 효과 변경", descEn: "Edit Repel steps, Strength and Flash usage, and Black/White Flute effects.", descKo: "리펠 걸음, 괴력·플래시, 검은/하얀 플루트 효과를 고칩니다." },
  { id: "refresh_map", kind: "debug", parent: "field_menu", en: "Refresh map", ko: "맵 새로고침", descEn: "Make all events on this map, and common events, refresh themselves.", descKo: "이 맵의 이벤트와 공통 이벤트를 다시 검사합니다." },
  { id: "day_care", kind: "debug", parent: "field_menu", en: "Day Care", ko: "키우미집", descEn: "View Pokémon in the Day Care and edit them.", descKo: "키우미집의 포켓몬을 보고 고칩니다." },
  { id: "storage_wallpapers", kind: "debug", parent: "field_menu", en: "Toggle storage wallpapers", ko: "박스 벽지", descEn: "Unlock and lock special wallpapers used in Pokémon storage.", descKo: "보관함 특수 벽지를 잠그거나 해제합니다." },
  { id: "skip_credits", kind: "debug", parent: "field_menu", en: "Skip credits", ko: "엔딩 스킵", descEn: "Toggle whether credits can be ended early by pressing the Use input.", descKo: "엔딩 크레딧을 결정 키로 건너뛸 수 있는지 바꿉니다." },

  { id: "battle_menu", kind: "debug", parent: "main", en: "Battle options...", ko: "배틀 설정...", descEn: "Start battles, reset this map's trainers, ready rematches, edit roamers, etc.", descKo: "배틀 테스트, 이 맵 트레이너 리셋, 배회 포켓몬 등을 다룹니다." },
  { id: "test_wild_battle", kind: "debug", parent: "battle_menu", en: "Test wild battle", ko: "야생 배틀 테스트", descEn: "Start a single battle against a wild Pokémon. You choose the species/level.", descKo: "종족과 레벨을 골라 야생 포켓몬과 한 마리 배틀을 시작합니다." },
  { id: "test_wild_battle_advanced", kind: "debug", parent: "battle_menu", en: "Test wild battle advanced", ko: "야생 배틀 고급", descEn: "Start a battle against 1 or more wild Pokémon. Battle size is your choice.", descKo: "여러 야생 포켓몬과, 원하는 배틀 인원으로 싸웁니다." },
  { id: "test_trainer_battle", kind: "debug", parent: "battle_menu", en: "Test trainer battle", ko: "트레이너 배틀 테스트", descEn: "Start a single battle against a trainer of your choice.", descKo: "선택한 트레이너와 배틀을 시작합니다." },
  { id: "test_trainer_battle_advanced", kind: "debug", parent: "battle_menu", en: "Test trainer battle advanced", ko: "트레이너 배틀 고급", descEn: "Start a battle against 1 or more trainers with a battle size of your choice.", descKo: "여러 트레이너와, 원하는 배틀 인원으로 싸웁니다." },
  { id: "encounter_version", kind: "debug", parent: "battle_menu", en: "Set wild encounters version", ko: "야생 출현 버전", descEn: "Choose which version of wild encounters should be used.", descKo: "야생 출현 테이블 버전을 고릅니다." },
  { id: "roamers", kind: "debug", parent: "battle_menu", en: "Roaming Pokémon", ko: "배회 포켓몬", descEn: "Toggle and edit all roaming Pokémon.", descKo: "배회 포켓몬의 상태와 위치를 고칩니다." },
  { id: "reset_trainers", kind: "debug", parent: "battle_menu", en: "Reset map's trainers", ko: "이 맵 트레이너 리셋", descEn: 'Turn off Self Switches A and B for all events with "Trainer" in their name.', descKo: "이름에 Trainer가 있는 이벤트의 셀프 스위치 A/B를 끕니다." },
  { id: "toggle_exp_all", kind: "debug", parent: "battle_menu", en: "Toggle Exp. All's effect", ko: "경험치나누기 효과", descEn: "Toggle Exp. All's effect of giving Exp. to non-participants.", descKo: "배틀에 내보내지 않은 포켓몬에게도 경험치를 줄지 바꿉니다." },
  { id: "toggle_logging", kind: "debug", parent: "battle_menu", en: "Toggle logging of battle messages", ko: "배틀 로그 기록", descEn: "Record debug logs for battles in Data/debuglog.txt.", descKo: "배틀 디버그 로그를 Data/debuglog.txt에 남깁니다." },

  { id: "pokemon_menu", kind: "debug", parent: "main", en: "Pokémon options...", ko: "포켓몬 설정...", descEn: "Heal the party, give Pokémon, fill/empty PC storage, etc.", descKo: "파티 회복, 포켓몬 추가, 박스 채우기/비우기 등을 다룹니다." },
  { id: "heal_party", kind: "debug", parent: "pokemon_menu", en: "Heal party", ko: "파티 회복", descEn: "Fully heal the HP/status/PP of all Pokémon in the party.", descKo: "파티의 HP·상태·PP를 모두 회복합니다." },
  { id: "add_pokemon", kind: "debug", parent: "pokemon_menu", en: "Add Pokémon", ko: "포켓몬 추가", descEn: "Give yourself a Pokémon of a chosen species/level. Goes to PC if party is full.", descKo: "종족과 레벨을 골라 받습니다. 파티가 가득하면 박스로 갑니다." },
  { id: "fill_boxes", kind: "debug", parent: "pokemon_menu", en: "Fill storage boxes", ko: "박스 채우기", descEn: "Puts one Pokémon of each species (at Level 50) in storage.", descKo: "모든 종족을 레벨 50으로 박스에 한 마리씩 넣습니다." },
  { id: "clear_boxes", kind: "debug", parent: "pokemon_menu", en: "Clear storage boxes", ko: "박스 비우기", descEn: "Remove all Pokémon in storage.", descKo: "보관함의 포켓몬을 모두 지웁니다." },
  { id: "give_demo_party", kind: "debug", parent: "pokemon_menu", en: "Give demo party", ko: "데모 파티", descEn: "Give yourself a predefined party of Pokémon.", descKo: "미리 정해 둔 파티를 받습니다." },
  { id: "quick_hatch_party_eggs", kind: "debug", parent: "pokemon_menu", en: "Quick hatch all party eggs", ko: "파티 알 바로 부화", descEn: "Make all eggs in the party require only one more step to hatch.", descKo: "파티의 알이 한 걸음만 더 걸으면 부화하게 합니다." },
  { id: "open_storage", kind: "debug", parent: "pokemon_menu", en: "Access Pokémon storage", ko: "포켓몬 보관함", descEn: "Open the Pokémon storage screen.", descKo: "포켓몬 보관함 화면을 엽니다." },
  { id: "shadow_pokemon_menu", kind: "debug", parent: "pokemon_menu", en: "Shadow Pokémon options...", ko: "그림자 포켓몬...", descEn: "Snag Machine and purification.", descKo: "스내그머신과 정화를 다룹니다." },
  { id: "toggle_snag_machine", kind: "debug", parent: "shadow_pokemon_menu", en: "Toggle Snag Machine", ko: "스내그머신", descEn: "Toggle all Poké Balls being able to catch Shadow Pokémon.", descKo: "모든 볼로 그림자 포켓몬을 잡을 수 있는지 바꿉니다." },
  { id: "toggle_purify_chamber_access", kind: "debug", parent: "shadow_pokemon_menu", en: "Toggle Purify Chamber access", ko: "정화장치 사용", descEn: "Toggle access to the Purify Chamber via the PC.", descKo: "PC에서 정화장치를 쓸 수 있는지 바꿉니다." },
  { id: "purify_chamber", kind: "debug", parent: "shadow_pokemon_menu", en: "Use Purify Chamber", ko: "정화장치 열기", descEn: "Open the Purify Chamber for Shadow Pokémon purification.", descKo: "그림자 포켓몬 정화장치를 엽니다." },
  { id: "relic_stone", kind: "debug", parent: "shadow_pokemon_menu", en: "Use Relic Stone", ko: "성스러운 돌", descEn: "Choose a Shadow Pokémon to show to the Relic Stone for purification.", descKo: "그림자 포켓몬을 성스러운 돌에 보여 정화합니다." },

  { id: "items_menu", kind: "debug", parent: "main", en: "Item options...", ko: "도구 설정...", descEn: "Give and take items.", descKo: "도구를 넣거나 빼니다." },
  { id: "add_item", kind: "debug", parent: "items_menu", en: "Add item", ko: "도구 추가", descEn: "Choose an item and a quantity of it to add to the Bag.", descKo: "도구와 개수를 골라 가방에 넣습니다." },
  { id: "fill_bag", kind: "debug", parent: "items_menu", en: "Fill Bag", ko: "가방 채우기", descEn: "Empties the Bag and then fills it with a certain number of every item.", descKo: "가방을 비운 뒤 모든 도구를 넣은 개수만큼 채웁니다." },
  { id: "empty_bag", kind: "debug", parent: "items_menu", en: "Empty Bag", ko: "가방 비우기", descEn: "Remove all items from the Bag.", descKo: "가방의 도구를 모두 지웁니다." },

  { id: "player_menu", kind: "debug", parent: "main", en: "Player options...", ko: "플레이어 설정...", descEn: "Set money, badges, Pokédexes, player's appearance and name, etc.", descKo: "돈, 배지, 도감, 주인공 외형과 이름 등을 다룹니다." },
  { id: "set_money", kind: "debug", parent: "player_menu", en: "Set money", ko: "소지금 설정", descEn: "Edit how much money, Game Corner Coins and Battle Points you have.", descKo: "돈, 동전, BP를 고칩니다." },
  { id: "set_badges", kind: "debug", parent: "player_menu", en: "Set Gym Badges", ko: "배지 설정", descEn: "Toggle possession of each Gym Badge.", descKo: "체육관 배지 보유를 바꿉니다." },
  { id: "toggle_running_shoes", kind: "debug", parent: "player_menu", en: "Toggle running shoes", ko: "러닝슈즈", descEn: "Toggle possession of running shoes.", descKo: "러닝슈즈 보유를 바꿉니다." },
  { id: "toggle_pokedex", kind: "debug", parent: "player_menu", en: "Toggle Pokédex and Regional Dexes", ko: "도감 설정", descEn: "Toggle possession of the Pokédex, and edit Regional Dex accessibility.", descKo: "도감 보유와 지역 도감 개방을 바꿉니다." },
  { id: "toggle_pokegear", kind: "debug", parent: "player_menu", en: "Toggle Pokégear", ko: "포켓기어", descEn: "Toggle possession of the Pokégear.", descKo: "포켓기어 보유를 바꿉니다." },
  { id: "edit_phone_contacts", kind: "debug", parent: "player_menu", en: "Edit phone and contacts", ko: "전화·연락처", descEn: "Edit properties of the phone and of contacts registered in it.", descKo: "전화와 등록된 연락처를 고칩니다." },
  { id: "toggle_box_link", kind: "debug", parent: "player_menu", en: "Toggle access to storage from party screen", ko: "파티에서 박스 열기", descEn: "Toggle access to storage from the party screen.", descKo: "파티 화면에서 보관함을 열 수 있는지 바꿉니다." },
  { id: "set_player_character", kind: "debug", parent: "player_menu", en: "Set player character", ko: "주인공 캐릭터", descEn: 'Edit the player\'s character, as defined in "metadata.txt".', descKo: "주인공 캐릭터를 바꿉니다." },
  { id: "change_outfit", kind: "debug", parent: "player_menu", en: "Set player outfit", ko: "의상 번호", descEn: "Edit the player's outfit number.", descKo: "주인공 의상 번호를 바꿉니다." },
  { id: "rename_player", kind: "debug", parent: "player_menu", en: "Set player name", ko: "이름 변경", descEn: "Rename the player.", descKo: "주인공 이름을 바꿉니다." },
  { id: "random_id", kind: "debug", parent: "player_menu", en: "Randomize player ID", ko: "ID 무작위", descEn: "Generate a random new ID for the player.", descKo: "플레이어 ID를 무작위로 다시 만듭니다." },

  { id: "pbs_editors_menu", kind: "debug", parent: "main", en: "PBS file editors...", ko: "PBS 편집...", descEn: "Edit information in the PBS files.", descKo: "PBS 파일의 데이터를 고칩니다. 배포본에는 PBS가 없을 수 있습니다." },
  { id: "set_map_connections", kind: "debug", parent: "pbs_editors_menu", en: "Edit map_connections.txt", ko: "맵 연결 편집", descEn: "Connect maps using a visual interface. Can also edit map encounters/metadata.", descKo: "맵 연결을 시각적으로 고칩니다." },
  { id: "set_encounters", kind: "debug", parent: "pbs_editors_menu", en: "Edit encounters.txt", ko: "출현 편집", descEn: "Edit the wild Pokémon that can be found on maps, and how they are encountered.", descKo: "맵의 야생 출현을 고칩니다." },
  { id: "set_trainers", kind: "debug", parent: "pbs_editors_menu", en: "Edit trainers.txt", ko: "트레이너 편집", descEn: "Edit individual trainers, their Pokémon and items.", descKo: "트레이너와 포켓몬·도구를 고칩니다." },
  { id: "set_trainer_types", kind: "debug", parent: "pbs_editors_menu", en: "Edit trainer_types.txt", ko: "트레이너 타입 편집", descEn: "Edit the properties of trainer types.", descKo: "트레이너 타입 속성을 고칩니다." },
  { id: "set_map_metadata", kind: "debug", parent: "pbs_editors_menu", en: "Edit map_metadata.txt", ko: "맵 메타데이터", descEn: "Edit map metadata.", descKo: "맵 메타데이터를 고칩니다." },
  { id: "set_metadata", kind: "debug", parent: "pbs_editors_menu", en: "Edit metadata.txt", ko: "전역 메타데이터", descEn: "Edit global metadata and player character metadata.", descKo: "전역·주인공 메타데이터를 고칩니다." },
  { id: "set_items", kind: "debug", parent: "pbs_editors_menu", en: "Edit items.txt", ko: "도구 데이터 편집", descEn: "Edit item data.", descKo: "도구 데이터를 고칩니다." },
  { id: "set_species", kind: "debug", parent: "pbs_editors_menu", en: "Edit pokemon.txt", ko: "종족 데이터 편집", descEn: "Edit Pokémon species data.", descKo: "종족 데이터를 고칩니다." },
  { id: "position_sprites", kind: "debug", parent: "pbs_editors_menu", en: "Edit pokemon_metrics.txt", ko: "스프라이트 위치", descEn: "Reposition Pokémon sprites in battle.", descKo: "배틀 스프라이트 위치를 고칩니다." },
  { id: "auto_position_sprites", kind: "debug", parent: "pbs_editors_menu", en: "Auto-set pokemon_metrics.txts", ko: "스프라이트 위치 자동", descEn: "Automatically reposition all Pokémon sprites in battle. Don't use lightly.", descKo: "배틀 스프라이트 위치를 자동으로 맞춥니다." },
  { id: "set_pokedex_lists", kind: "debug", parent: "pbs_editors_menu", en: "Edit regional_dexes.txt", ko: "지역도감 편집", descEn: "Create, rearrange and delete Regional Pokédex lists.", descKo: "지역 도감 목록을 만듭니다." },

  { id: "editors_menu", kind: "debug", parent: "main", en: "Other editors...", ko: "기타 편집...", descEn: "Edit battle animations, terrain tags, map data, etc.", descKo: "배틀 애니메이션, 지형 태그 등을 고칩니다." },
  { id: "animation_editor", kind: "debug", parent: "editors_menu", en: "Battle animation editor", ko: "배틀 애니메이션 편집", descEn: "Edit the battle animations.", descKo: "배틀 애니메이션을 고칩니다." },
  { id: "animation_organiser", kind: "debug", parent: "editors_menu", en: "Battle animation organiser", ko: "배틀 애니메이션 정리", descEn: "Rearrange/add/delete battle animations.", descKo: "배틀 애니메이션을 정리합니다." },
  { id: "import_animations", kind: "debug", parent: "editors_menu", en: "Import all battle animations", ko: "애니메이션 가져오기", descEn: 'Import all battle animations from the "Animations" folder.', descKo: "Animations 폴더에서 가져옵니다." },
  { id: "export_animations", kind: "debug", parent: "editors_menu", en: "Export all battle animations", ko: "애니메이션 내보내기", descEn: "Export all battle animations individually to the \"Animations\" folder.", descKo: "Animations 폴더로 내보냅니다." },
  { id: "set_terrain_tags", kind: "debug", parent: "editors_menu", en: "Edit terrain tags", ko: "지형 태그", descEn: "Edit the terrain tags of tiles in tilesets. Required for tags 8+.", descKo: "타일셋의 지형 태그를 고칩니다." },
  { id: "fix_invalid_tiles", kind: "debug", parent: "editors_menu", en: "Fix invalid tiles", ko: "잘못된 타일 수정", descEn: "Scans all maps and erases non-existent tiles.", descKo: "없는 타일을 지웁니다." },

  { id: "files_menu", kind: "debug", parent: "main", en: "Files options...", ko: "파일 설정...", descEn: "Compile, generate PBS files, translations, Mystery Gifts, etc.", descKo: "컴파일, PBS 생성, 번역, 이상한 소포 등을 다룹니다." },
  { id: "compile_data", kind: "debug", parent: "files_menu", en: "Compile data", ko: "데이터 컴파일", descEn: "Fully compile all data.", descKo: "데이터를 다시 컴파일합니다." },
  { id: "create_pbs_files", kind: "debug", parent: "files_menu", en: "Create PBS file(s)", ko: "PBS 파일 만들기", descEn: "Choose one or all PBS files and create it.", descKo: "PBS 파일을 만듭니다." },
  { id: "rename_files", kind: "debug", parent: "files_menu", en: "Rename outdated files", ko: "옛 파일 이름 바꾸기", descEn: "Check for files with outdated names and rename/move them. Can alter map data.", descKo: "옛 파일 이름을 바꿉니다." },
  { id: "extract_text", kind: "debug", parent: "files_menu", en: "Extract text for translation", ko: "번역용 텍스트 추출", descEn: "Extract all text in the game to text files for translating.", descKo: "번역용 텍스트를 뽑습니다." },
  { id: "compile_text", kind: "debug", parent: "files_menu", en: "Compile translated text", ko: "번역 텍스트 컴파일", descEn: "Import text files and convert them into a language file.", descKo: "번역 텍스트를 언어 파일로 만듭니다." },
  { id: "mystery_gift", kind: "debug", parent: "files_menu", en: "Manage Mystery Gifts", ko: "이상한 소포", descEn: "Edit and enable/disable Mystery Gifts.", descKo: "이상한 소포를 고칩니다." },
  { id: "reload_system_cache", kind: "debug", parent: "files_menu", en: "Reload system cache", ko: "캐시 다시 읽기", descEn: "Refreshes the system's file cache. Use if you change a file while playing.", descKo: "파일 캐시를 다시 읽습니다." },

  { id: "hp_status_menu", kind: "pokemon", parent: "main", en: "HP/status...", ko: "HP/상태..." },
  { id: "set_hp", kind: "pokemon", parent: "hp_status_menu", en: "Set HP", ko: "HP 설정" },
  { id: "set_status", kind: "pokemon", parent: "hp_status_menu", en: "Set status", ko: "상태이상 설정" },
  { id: "full_heal", kind: "pokemon", parent: "hp_status_menu", en: "Fully heal", ko: "완전 회복" },
  { id: "heal_hp_status", kind: "pokemon", parent: "hp_status_menu", en: "Heal HP and status", ko: "HP·상태 회복" },
  { id: "make_fainted", kind: "pokemon", parent: "hp_status_menu", en: "Make fainted", ko: "기절시키기" },
  { id: "set_pokerus", kind: "pokemon", parent: "hp_status_menu", en: "Set Pokérus", ko: "포켓러스" },
  { id: "level_stats", kind: "pokemon", parent: "main", en: "Level/stats...", ko: "레벨/능력치..." },
  { id: "set_level", kind: "pokemon", parent: "level_stats", en: "Set level", ko: "레벨 설정" },
  { id: "set_exp", kind: "pokemon", parent: "level_stats", en: "Set Exp", ko: "경험치 설정" },
  { id: "hidden_values", kind: "pokemon", parent: "level_stats", en: "EV/IV/personal ID...", ko: "노력치/개체값/ID..." },
  { id: "set_happiness", kind: "pokemon", parent: "level_stats", en: "Set happiness", ko: "친밀도" },
  { id: "contest_stats", kind: "pokemon", parent: "level_stats", en: "Contest stats...", ko: "콘테스트 능력..." },
  { id: "set_beauty", kind: "pokemon", parent: "contest_stats", en: "Set Beauty", ko: "아름다움" },
  { id: "set_cool", kind: "pokemon", parent: "contest_stats", en: "Set Cool", ko: "근사함" },
  { id: "set_cute", kind: "pokemon", parent: "contest_stats", en: "Set Cute", ko: "귀여움" },
  { id: "set_smart", kind: "pokemon", parent: "contest_stats", en: "Set Smart", ko: "슬기로움" },
  { id: "set_tough", kind: "pokemon", parent: "contest_stats", en: "Set Tough", ko: "강인함" },
  { id: "set_sheen", kind: "pokemon", parent: "contest_stats", en: "Set Sheen", ko: "윤기" },
  { id: "moves", kind: "pokemon", parent: "main", en: "Moves...", ko: "기술..." },
  { id: "teach_move", kind: "pokemon", parent: "moves", en: "Teach move", ko: "기술 가르치기" },
  { id: "forget_move", kind: "pokemon", parent: "moves", en: "Forget move", ko: "기술 지우기" },
  { id: "reset_moves", kind: "pokemon", parent: "moves", en: "Reset moves", ko: "기술 초기화" },
  { id: "set_move_pp", kind: "pokemon", parent: "moves", en: "Set move PP", ko: "PP 설정" },
  { id: "set_initial_moves", kind: "pokemon", parent: "moves", en: "Reset initial moves", ko: "초기 기술로" },
  { id: "set_item", kind: "pokemon", parent: "main", en: "Set item", ko: "지닌 도구" },
  { id: "set_ability", kind: "pokemon", parent: "main", en: "Set ability", ko: "특성" },
  { id: "set_nature", kind: "pokemon", parent: "main", en: "Set nature", ko: "성격" },
  { id: "set_gender", kind: "pokemon", parent: "main", en: "Set gender", ko: "성별" },
  { id: "species_and_form", kind: "pokemon", parent: "main", en: "Species/form...", ko: "종족/폼..." },
  { id: "set_form", kind: "pokemon", parent: "species_and_form", en: "Set form", ko: "폼 설정" },
  { id: "set_species_pkmn", kind: "pokemon", parent: "species_and_form", en: "Set species", ko: "종족 설정" },
  { id: "cosmetic", kind: "pokemon", parent: "main", en: "Cosmetic info...", ko: "외형..." },
  { id: "set_shininess", kind: "pokemon", parent: "cosmetic", en: "Set shininess", ko: "색이 다른" },
  { id: "set_pokeball", kind: "pokemon", parent: "cosmetic", en: "Set Poké Ball", ko: "몬스터볼" },
  { id: "set_ribbons", kind: "pokemon", parent: "cosmetic", en: "Set ribbons", ko: "리본" },
  { id: "set_nickname", kind: "pokemon", parent: "cosmetic", en: "Set nickname", ko: "닉네임" },
  { id: "ownership", kind: "pokemon", parent: "cosmetic", en: "Ownership...", ko: "어버이..." },
  { id: "set_discardable", kind: "pokemon", parent: "main", en: "Set discardable", ko: "놓아주기 가능" },
  { id: "set_egg", kind: "pokemon", parent: "main", en: "Set egg", ko: "알 설정" },
  { id: "shadow_pkmn", kind: "pokemon", parent: "main", en: "Shadow Pkmn...", ko: "그림자 포켓몬..." },
  { id: "mystery_gift_pkmn", kind: "pokemon", parent: "main", en: "Mystery Gift", ko: "이상한 소포" },
  { id: "duplicate", kind: "pokemon", parent: "main", en: "Duplicate", ko: "복제" },
  { id: "delete", kind: "pokemon", parent: "main", en: "Delete", ko: "삭제" },

  { id: "battlers", kind: "battle", parent: "main", en: "Battlers...", ko: "배틀러...", descEn: "Look at Pokémon in battle and change their properties.", descKo: "배틀 중인 포켓몬을 보고 고칩니다." },
  { id: "list_player_battlers", kind: "battle", parent: "battlers", en: "Player-side battlers", ko: "아군 배틀러", descEn: "Edit Pokémon on the player's side of battle.", descKo: "아군 쪽 포켓몬을 고칩니다." },
  { id: "list_foe_battlers", kind: "battle", parent: "battlers", en: "Foe-side battlers", ko: "상대 배틀러", descEn: "Edit Pokémon on the opposing side of battle.", descKo: "상대 쪽 포켓몬을 고칩니다." },
  { id: "speed_order", kind: "battle", parent: "battlers", en: "View battler speed order", ko: "스피드 순서", descEn: "Show all battlers in order from fastest to slowest.", descKo: "빠른 순으로 배틀러를 보여 줍니다." },
  { id: "pokemon_teams", kind: "battle", parent: "main", en: "Pokémon teams", ko: "포켓몬 파티", descEn: "Look at and edit all Pokémon in each team.", descKo: "양쪽 파티를 보고 고칩니다." },
  { id: "trainers", kind: "battle", parent: "main", en: "Trainer options...", ko: "트레이너 설정...", descEn: "Variables that apply to trainers.", descKo: "트레이너에게 걸리는 설정을 다룹니다." },
  { id: "trainer_items", kind: "battle", parent: "trainers", en: "NPC trainer items", ko: "NPC 도구", descEn: "View and change the items each NPC trainer has access to.", descKo: "NPC 트레이너 도구를 고칩니다." },
  { id: "mega_evolution", kind: "battle", parent: "trainers", en: "Mega Evolution", ko: "메가진화", descEn: "Whether each trainer is allowed to Mega Evolve.", descKo: "메가진화 가능 여부를 바꿉니다." },
  { id: "field", kind: "battle", parent: "main", en: "Field effects...", ko: "필드 효과...", descEn: "Effects that apply to the whole battlefield.", descKo: "배틀필드 전체에 걸리는 효과를 다룹니다." },
  { id: "weather", kind: "battle", parent: "field", en: "Weather", ko: "날씨", descEn: "Set weather and duration.", descKo: "날씨와 지속 턴을 정합니다." },
  { id: "terrain", kind: "battle", parent: "field", en: "Terrain", ko: "필드", descEn: "Set terrain and duration.", descKo: "필드와 지속 턴을 정합니다." },
  { id: "environment_time", kind: "battle", parent: "field", en: "Environment/time", ko: "환경/시간", descEn: "Set the battle's environment and time of day.", descKo: "배틀 환경과 시간을 정합니다." },
  { id: "backdrop", kind: "battle", parent: "field", en: "Backdrop names", ko: "배경 이름", descEn: "Set the names of the backdrop and base graphics.", descKo: "배경·바닥 그래픽 이름을 정합니다." },
  { id: "set_field_effects", kind: "battle", parent: "field", en: "Other field effects...", ko: "기타 필드 효과...", descEn: "View/set other effects that apply to the whole battlefield.", descKo: "그 외 필드 효과를 고칩니다." },
  { id: "player_side", kind: "battle", parent: "field", en: "Player's side effects...", ko: "아군 사이드 효과...", descEn: "Effects that apply to the side the player is on.", descKo: "아군 사이드 효과를 고칩니다." },
  { id: "opposing_side", kind: "battle", parent: "field", en: "Foe's side effects...", ko: "상대 사이드 효과...", descEn: "Effects that apply to the opposing side.", descKo: "상대 사이드 효과를 고칩니다." },
  { id: "position_effects", kind: "battle", parent: "field", en: "Battler position effects...", ko: "자리 효과...", descEn: "Effects that apply to individual battler positions.", descKo: "자리마다 걸리는 효과를 고칩니다." },

  { id: "bp_hp_status", kind: "battle_pokemon", parent: "main", en: "HP/status...", ko: "HP/상태..." },
  { id: "bp_set_hp", kind: "battle_pokemon", parent: "hp_status_menu", en: "Set HP", ko: "HP 설정" },
  { id: "bp_set_status", kind: "battle_pokemon", parent: "hp_status_menu", en: "Set status", ko: "상태이상 설정" },
  { id: "bp_full_heal", kind: "battle_pokemon", parent: "hp_status_menu", en: "Fully heal", ko: "완전 회복" },
  { id: "bp_level_stats", kind: "battle_pokemon", parent: "main", en: "Stats/level...", ko: "능력치/레벨..." },
  { id: "bp_set_stat_stages", kind: "battle_pokemon", parent: "level_stats", en: "Set stat stages", ko: "능력 랭크" },
  { id: "bp_set_stat_values", kind: "battle_pokemon", parent: "level_stats", en: "Set stat values", ko: "능력치 값" },
  { id: "bp_set_types", kind: "battle_pokemon", parent: "main", en: "Set types", ko: "타입 설정" },
  { id: "bp_set_effects", kind: "battle_pokemon", parent: "main", en: "Set effects", ko: "효과 설정" },
];

export const DEBUG_EXTRA_KO: Record<string, string> = {
  Debug: "디버그",
  "Open the debug menu.": "디버그 메뉴를 엽니다.",
  "Do what with {1}?": "{1}을(를) 어떻게 할까요?",
  "Your Pokémon were fully healed.": "포켓몬을 모두 회복했습니다.",
  "Added {1} to party.": "{1}을(를) 파티에 넣었습니다.",
  "Added {1} to Pokémon storage.": "{1}을(를) 보관함에 넣었습니다.",
  "Couldn't add Pokémon because party and storage are full.": "파티와 보관함이 가득 차 넣을 수 없습니다.",
  "Storage boxes were filled with one Pokémon of each species.": "모든 종족을 박스에 한 마리씩 넣었습니다.",
  "The storage boxes were cleared.": "보관함을 비웠습니다.",
  "All Trainers on this map were reset.": "이 맵의 트레이너를 리셋했습니다.",
  "This command can't be used here.": "여기에서는 쓸 수 없습니다.",
  "Enabled Exp. All's effect.": "경험치나누기 효과를 켰습니다.",
  "Disabled Exp. All's effect.": "경험치나누기 효과를 껐습니다.",
  "Gave {1}x {2}.": "{2}을(를) {1}개 넣었습니다.",
  "Choose the number of items.": "개수를 고르세요.",
  "Add how many {1}?": "{1}을(를) 몇 개 넣을까요?",
  "Set the Pokémon's level.": "포켓몬의 레벨을 정하세요.",
  "You aren't in the Safari Zone or a Bug-Catching Contest!": "사파리존이나 곤충채집 중이 아닙니다.",
  "You're not in a dark map!": "어두운 맵이 아닙니다.",
  "No Pokémon were chosen, cannot start battle.": "포켓몬을 고르지 않아 배틀을 시작할 수 없습니다.",
  "You only have one Pokémon.": "포켓몬이 한 마리뿐입니다.",
  "Credits can be skipped when played in future.": "다음 엔딩부터 건너뛸 수 있습니다.",
  "Credits cannot be skipped when next played.": "다음 엔딩은 건너뛸 수 없습니다.",
  "There are no special wallpapers defined.": "특수 벽지가 없습니다.",
  "No description available": "설명이 없습니다.",
  "<No description available>": "<설명 없음>",
  "Search for what?": "무엇을 찾을까요?",
  CANCEL: "취소",
  Cancel: "취소",
  "Money: ${1}": "돈: {1}원",
  "Coins: {1}": "동전: {1}",
  "Battle Points: {1}": "BP: {1}",
  "ADD ITEM": "도구 추가",
  "ADD POKÉMON": "포켓몬 추가",
  "Choose a Pokémon.": "포켓몬을 고르세요.",
  "The map will refresh.": "맵을 새로고칩니다.",
  "(결과 없음)": "(결과 없음)",
  "Give yourself 6 preset Pokémon. They overwrite the current party.": "정해 둔 6마리를 받습니다. 지금 파티를 덮어씁니다.",
  "Make all eggs in the party require just one more step to hatch.": "파티의 알이 한 걸음만 더 걸으면 부화하게 합니다.",
  "Opens the Pokémon storage boxes in Organize Boxes mode.": "정리 모드로 보관함을 엽니다.",
  "Shadow Pokémon": "그림자 포켓몬",
};

export function debugKoMap(): Record<string, string> {
  const m: Record<string, string> = { ...DEBUG_EXTRA_KO };
  for (const item of DEBUG_ITEMS) {
    m[item.en] = item.ko;
    if (item.descEn && item.descKo) m[item.descEn] = item.descKo;
  }
  return m;
}

export function debugMatch(item: DebugItem, q: string) {
  const n = q.trim().toLowerCase();
  if (!n) return true;
  const blob = [item.ko, item.en, item.descKo, item.descEn, item.id, DEBUG_KIND_KO[item.kind], DEBUG_GROUP_KO[item.parent] || ""]
    .join(" ")
    .toLowerCase();
  if (blob.includes(n)) return true;
  const tokens = n.split(/\s+/).filter(Boolean);
  if (tokens.length > 1 && tokens.every((t) => blob.includes(t))) return true;
  const compact = (s: string) => s.toLowerCase().replace(/[\s:._\-()/]/g, "");
  return compact(blob).includes(compact(n));
}

export const DEBUG_KO_HELP =
  "게임에서 F9로 디버그 메뉴를 연 다음 F 키로 검색합니다. 한글 이름, 영문 ID, 번호를 모두 찾습니다.";
