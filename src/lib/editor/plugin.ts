import { zipStore } from "./zip.ts";

export { buildDebugKoPluginZip, DEBUG_KO_HELP } from "./plugin-debug.ts";

const META = `Name       = Redforge All TMs
Version    = 1.0
Essentials = 19,20,21
Credits    = 레드포지
`;

const SCRIPT = `#===============================================================================
# 레드포지 — 새 게임을 시작하면 모든 기술머신(TM/HM/TR)을 가방에 넣습니다.
# 이 폴더를 게임의 Plugins 안에 두고 게임을 다시 시작하세요.
# 이미 진행 중인 세이브에는 적용되지 않습니다. 새 게임을 시작해야 합니다.
#===============================================================================
EventHandlers.add(:on_new_game, :redforge_give_all_tms, proc {
  GameData::Item.each do |item|
    machine = false
    machine ||= item.is_TM? if item.respond_to?(:is_TM?)
    machine ||= item.is_HM? if item.respond_to?(:is_HM?)
    machine ||= item.is_TR? if item.respond_to?(:is_TR?)
    machine ||= item.is_machine? if item.respond_to?(:is_machine?)
    next unless machine
    begin
      next if $bag.quantity(item.id) > 0
    rescue
    end
    $bag.add(item.id, 1)
  end
})
`;

export function buildAllTmsPluginZip(): Uint8Array {
  return zipStore([
    { name: "Plugins/Redforge All TMs/meta.txt", data: META },
    { name: "Plugins/Redforge All TMs/001_GiveAllTMs.rb", data: SCRIPT },
  ]);
}
