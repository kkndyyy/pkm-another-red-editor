import { zipStore } from "./zip.ts";
import { debugKoMap, DEBUG_KO_HELP } from "./debug-catalog.ts";

export { DEBUG_KO_HELP };

const META = `Name       = Redforge Debug KO
Version    = 1.1
Essentials = 19,20,21
Credits    = 레드포지
`;

function rubyQuote(s: string) {
  return `"${s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/#/g, "\\#")}"`;
}

function byEnRuby() {
  return Object.entries(debugKoMap())
    .map(([k, v]) => `    ${rubyQuote(k)} => ${rubyQuote(v)}`)
    .join(",\n");
}

function buildScript() {
  return `#===============================================================================
# 레드포지 — 디버그 메뉴 한글화 + 검색
# 이 폴더를 Plugins 안에 두고, 게임을 끌 때 Ctrl을 누른 채로 실행하세요.
# F9 디버그 / 포켓몬 디버그 / 배틀 디버그, 종족·기술·도구 목록에서
# F 키(또는 점프 위)로 한글 이름·영문 ID·번호를 검색합니다.
#===============================================================================

module RedforgeDebug
  BY_EN = {
${byEnRuby()}
  }

  def self.tr(msg)
    return msg if !msg.is_a?(String)
    BY_EN[msg] || msg
  end

  def self.match?(text, query)
    return true if query.nil? || query == ""
    s = text.to_s.downcase
    q = query.to_s.downcase.strip
    return true if q == ""
    return true if s.include?(q)
    tokens = q.split(/\\s+/).reject { |t| t == "" }
    return true if tokens.length > 1 && tokens.all? { |t| s.include?(t) }
    s2 = s.gsub(/[\\s:\\._\\-\\/\\(\\)]/, "")
    q2 = q.gsub(/[\\s:\\._\\-\\/\\(\\)]/, "")
    return true if q2 != "" && s2.include?(q2)
    false
  end

  def self.search_key?
    begin
      return true if Input.respond_to?(:triggerex?) && Input.triggerex?(:F)
    rescue
    end
    begin
      return true if Input.respond_to?(:triggerex?) && Input.triggerex?(0x46)
    rescue
    end
    begin
      return true if defined?(Input::SPECIAL) && Input.trigger?(Input::SPECIAL)
    rescue
    end
    return true if defined?(Input::JUMPUP) && Input.trigger?(Input::JUMPUP)
    false
  end

  def self.prompt_query(current)
    current = "" if current.nil?
    ret = pbMessageFreeText(_INTL("검색 (이름·번호·ID)"), current.to_s, false, 40)
    return ret.to_s
  end

  def self.apply_handlers
    menus = [:debug_menu, :pokemon_debug_menu, :battle_debug_menu,
             :battle_pokemon_debug_menu, :pause_menu]
    menus.each { |menu| rewrite_menu(menu) }
  end

  def self.rewrite_menu(menu)
    return if !defined?(MenuHandlers)
    if MenuHandlers.respond_to?(:each)
      MenuHandlers.each(menu) { |id, hash| apply_hash(id, hash) }
      return
    end
    MenuHandlers.class_variables.each do |cv|
      val = MenuHandlers.class_variable_get(cv)
      next if !val.is_a?(Hash) || !val[menu]
      data = val[menu]
      if data.respond_to?(:each)
        data.each do |id, hash|
          apply_hash(id, hash) if hash.is_a?(Hash)
        end
      end
      break
    end
  rescue
  end

  def self.apply_hash(_id, hash)
    return if !hash.is_a?(Hash)
    if hash["name"].is_a?(String) && BY_EN[hash["name"]]
      hash["name"] = BY_EN[hash["name"]]
    end
    if hash["description"].is_a?(String) && BY_EN[hash["description"]]
      hash["description"] = BY_EN[hash["description"]]
    end
  end
end

#-------------------------------------------------------------------------------
# 아직 번역되지 않은 디버그 문구를 한글로
#-------------------------------------------------------------------------------
if defined?(_INTL) && !defined?(_rf_old_INTL)
  alias _rf_old_INTL _INTL
  def _INTL(msg, *args)
    key = msg.to_s
    if RedforgeDebug::BY_EN[key]
      return _rf_old_INTL(RedforgeDebug::BY_EN[key], *args)
    end
    _rf_old_INTL(msg, *args)
  end
end

RedforgeDebug.apply_handlers

if defined?(MenuHandlers)
  MenuHandlers.add(:debug_menu, :redforge_search, {
    "name"        => "검색...",
    "parent"      => :main,
    "description" => "한글 이름, 영문 ID, 번호로 이 메뉴를 찾습니다. 목록에서도 F 키로 검색할 수 있습니다.",
    "always_show" => true,
    "effect"      => proc {
      pbMessage("디버그 메뉴와 포켓몬·기술·도구 목록에서 F 키(또는 점프 위)를 누르세요.\\n검색어를 입력하면 해당하는 항목만 남습니다.\\n취소 키를 누르면 검색이 지워집니다.")
    }
  })
end

#-------------------------------------------------------------------------------
# 디버그 메뉴 목록 필터
#-------------------------------------------------------------------------------
class CommandMenuList
  attr_accessor :filter_query

  unless method_defined?(:_rf_list)
    alias _rf_list list
  end
  def list
    ret = _rf_list
    q = @filter_query.to_s
    return ret if q.strip == ""
    ret.select { |name| RedforgeDebug.match?(name, q) }
  end

  unless method_defined?(:_rf_getCommand)
    alias _rf_getCommand getCommand
  end
  def getCommand(index)
    q = @filter_query.to_s
    return _rf_getCommand(index) if q.strip == ""
    count = 0
    @commands.each do |cmd|
      next if cmd[1] != @currentList
      next if !RedforgeDebug.match?(cmd[2], q) && !RedforgeDebug.match?(cmd[0].to_s, q) && !RedforgeDebug.match?(cmd[3].to_s, q)
      return cmd[0] if count == index
      count += 1
    end
    return nil
  end

  unless method_defined?(:_rf_getDesc)
    alias _rf_getDesc getDesc
  end
  def getDesc(index)
    q = @filter_query.to_s
    return _rf_getDesc(index) if q.strip == ""
    count = 0
    @commands.each do |cmd|
      next if cmd[1] != @currentList
      next if !RedforgeDebug.match?(cmd[2], q) && !RedforgeDebug.match?(cmd[0].to_s, q) && !RedforgeDebug.match?(cmd[3].to_s, q)
      if count == index
        return cmd[3] if cmd[3]
        break
      end
      count += 1
    end
    return _INTL("설명 없음")
  end
end

def rf_debug_pick_command(commands, sprites)
  cmdwindow = sprites["cmdwindow"]
  refresh = true
  loop do
    oldindex = cmdwindow.index
    cmdwindow.update
    if refresh || cmdwindow.index != oldindex
      desc = commands.getDesc(cmdwindow.index)
      q = commands.filter_query.to_s.strip
      if sprites["textbox"]
        sprites["textbox"].text = q != "" ? ("[" + q + "] " + desc.to_s) : desc.to_s
      end
      refresh = false
    end
    Graphics.update
    Input.update
    if RedforgeDebug.search_key?
      pbPlayDecisionSE
      commands.filter_query = RedforgeDebug.prompt_query(commands.filter_query)
      cmdwindow.commands = commands.list
      cmdwindow.index = 0
      refresh = true
    elsif Input.trigger?(Input::BACK)
      if commands.filter_query.to_s.strip != ""
        commands.filter_query = ""
        cmdwindow.commands = commands.list
        cmdwindow.index = 0
        refresh = true
      else
        parent = commands.getParent
        if parent
          pbPlayCancelSE
          commands.currentList = parent[0]
          commands.filter_query = ""
          cmdwindow.commands = commands.list
          cmdwindow.index = parent[1]
          refresh = true
        else
          return -1
        end
      end
    elsif Input.trigger?(Input::USE)
      return cmdwindow.index
    end
  end
end

alias _rf_pbDebugMenu pbDebugMenu if !defined?(_rf_pbDebugMenu)
def pbDebugMenu(show_all = true)
  commands = CommandMenuList.new
  commands.filter_query = ""
  MenuHandlers.each_available(:debug_menu) do |option, hash, name|
    next if !show_all && !hash["always_show"].nil? && !hash["always_show"]
    if hash["description"].is_a?(Proc)
      description = hash["description"].call
    elsif !hash["description"].nil?
      description = _INTL(hash["description"])
    end
    commands.add(option, hash, name, description)
  end
  viewport = Viewport.new(0, 0, Graphics.width, Graphics.height)
  viewport.z = 99999
  sprites = {}
  sprites["textbox"] = pbCreateMessageWindow
  sprites["textbox"].letterbyletter = false
  sprites["cmdwindow"] = Window_CommandPokemonEx.new(commands.list)
  cmdwindow = sprites["cmdwindow"]
  cmdwindow.x        = 0
  cmdwindow.y        = 0
  cmdwindow.width    = Graphics.width
  cmdwindow.height   = Graphics.height - sprites["textbox"].height
  cmdwindow.viewport = viewport
  cmdwindow.visible  = true
  sprites["textbox"].text = commands.getDesc(cmdwindow.index)
  pbFadeInAndShow(sprites)
  loop do
    ret = rf_debug_pick_command(commands, sprites)
    break if ret < 0
    cmd = commands.getCommand(ret)
    if cmd == :redforge_search
      pbPlayDecisionSE
      commands.filter_query = RedforgeDebug.prompt_query(commands.filter_query)
      cmdwindow.commands = commands.list
      cmdwindow.index = 0
      next
    end
    if commands.hasSubMenu?(cmd)
      pbPlayDecisionSE
      commands.currentList = cmd
      commands.filter_query = ""
      cmdwindow.commands = commands.list
      cmdwindow.index = 0
    elsif cmd == :warp
      return if MenuHandlers.call(:debug_menu, cmd, "effect", sprites, viewport)
    else
      MenuHandlers.call(:debug_menu, cmd, "effect")
    end
  end
  pbPlayCloseMenuSE
  pbFadeOutAndHide(sprites)
  pbDisposeMessageWindow(sprites["textbox"])
  pbDisposeSpriteHash(sprites)
  viewport.dispose
end

if defined?(Battle::DebugMixin)
  module Battle::DebugMixin
    alias _rf_pbBattleDebug pbBattleDebug if !method_defined?(:_rf_pbBattleDebug)
    def pbBattleDebug(battle, show_all = true)
      commands = CommandMenuList.new
      commands.filter_query = ""
      MenuHandlers.each_available(:battle_debug_menu) do |option, hash, name|
        next if !show_all && !hash["always_show"].nil? && !hash["always_show"]
        if hash["description"].is_a?(Proc)
          description = hash["description"].call
        elsif !hash["description"].nil?
          description = _INTL(hash["description"])
        end
        commands.add(option, hash, name, description)
      end
      viewport = Viewport.new(0, 0, Graphics.width, Graphics.height)
      viewport.z = 99999
      sprites = {}
      sprites["textbox"] = pbCreateMessageWindow
      sprites["textbox"].letterbyletter = false
      sprites["cmdwindow"] = Window_CommandPokemonEx.new(commands.list)
      cmdwindow = sprites["cmdwindow"]
      cmdwindow.x        = 0
      cmdwindow.y        = 0
      cmdwindow.width    = Graphics.width / 2
      cmdwindow.height   = Graphics.height - sprites["textbox"].height
      cmdwindow.viewport = viewport
      cmdwindow.visible  = true
      sprites["textbox"].text = commands.getDesc(cmdwindow.index)
      loop do
        ret = rf_debug_pick_command(commands, sprites)
        break if ret < 0
        cmd = commands.getCommand(ret)
        if commands.hasSubMenu?(cmd)
          pbPlayDecisionSE
          commands.currentList = cmd
          commands.filter_query = ""
          cmdwindow.commands = commands.list
          cmdwindow.index = 0
        else
          MenuHandlers.call(:battle_debug_menu, cmd, "effect", battle)
        end
      end
      pbPlayCloseMenuSE
      pbDisposeMessageWindow(sprites["textbox"])
      pbDisposeSpriteHash(sprites)
      viewport.dispose
    end
  end
end

if defined?(PokemonDebugMixin)
  module PokemonDebugMixin
    alias _rf_pbPokemonDebug pbPokemonDebug if !method_defined?(:_rf_pbPokemonDebug)
    def pbPokemonDebug(pkmn, pkmnid, heldpoke = nil, settingUpBattle = false)
      commands = CommandMenuList.new
      commands.filter_query = ""
      MenuHandlers.each_available(:pokemon_debug_menu) do |option, hash, name|
        next if settingUpBattle && !hash["always_show"].nil? && !hash["always_show"]
        commands.add(option, hash, name)
      end
      command = 0
      loop do
        names = commands.list
        shown = [_INTL("검색...")] + names
        command = pbShowCommands(_INTL("{1}을(를) 어떻게 할까요?", pkmn.name), shown, command)
        if command < 0
          parent = commands.getParent
          break if !parent
          commands.currentList = parent[0]
          commands.filter_query = ""
          command = parent[1]
        elsif command == 0
          commands.filter_query = RedforgeDebug.prompt_query(commands.filter_query)
          command = 0
        else
          cmd = commands.getCommand(command - 1)
          if commands.hasSubMenu?(cmd)
            commands.currentList = cmd
            commands.filter_query = ""
            command = 0
          elsif MenuHandlers.call(:pokemon_debug_menu, cmd, "effect", pkmn, pkmnid, heldpoke, settingUpBattle, self)
            break
          end
        end
      end
    end
  end
end

#-------------------------------------------------------------------------------
# 종족/기술/도구 등 디버그 목록 검색 (pbChooseList)
#-------------------------------------------------------------------------------
alias _rf_pbCommandsSortable pbCommandsSortable if !defined?(_rf_pbCommandsSortable)
def pbCommandsSortable(cmdwindow, commands, cmdIfCancel, defaultindex = -1, sortable = false)
  full = []
  commands.each_with_index { |c, i| full.push([c, i]) }
  query = ""
  shown = full
  apply = proc {
    q = query.to_s
    shown = []
    full.each do |pair|
      if q.strip == "" || RedforgeDebug.match?(pair[0], q)
        shown.push(pair)
      end
    end
    if shown.length == 0
      cmdwindow.commands = [_INTL("(결과 없음)")]
    else
      texts = []
      shown.each { |pair| texts.push(pair[0]) }
      cmdwindow.commands = texts
    end
    cmdwindow.index = 0
  }
  cmdwindow.commands = commands
  cmdwindow.index    = defaultindex if defaultindex >= 0
  cmdwindow.x        = 0
  cmdwindow.y        = 0
  cmdwindow.width    = Graphics.width / 2 if cmdwindow.width < Graphics.width / 2
  cmdwindow.height   = Graphics.height
  cmdwindow.z        = 99999
  cmdwindow.active   = true
  command = [0, -1]
  loop do
    Graphics.update
    Input.update
    cmdwindow.update
    if RedforgeDebug.search_key?
      pbPlayDecisionSE
      query = RedforgeDebug.prompt_query(query)
      apply.call
    elsif Input.trigger?(Input::ACTION) && sortable
      pair = shown[cmdwindow.index]
      command = [1, pair ? pair[1] : 0]
      break
    elsif Input.trigger?(Input::BACK)
      if query.to_s.strip != ""
        query = ""
        apply.call
      else
        command = [0, (cmdIfCancel > 0) ? cmdIfCancel - 1 : cmdIfCancel]
        break
      end
    elsif Input.trigger?(Input::USE)
      pair = shown[cmdwindow.index]
      if pair
        command = [0, pair[1]]
      else
        command = [0, (cmdIfCancel > 0) ? cmdIfCancel - 1 : cmdIfCancel]
      end
      break
    end
  end
  cmdwindow.active = false
  return command
end

#-------------------------------------------------------------------------------
# 에디터 리스트 (도구 추가, 맵 이동 등)
#-------------------------------------------------------------------------------
alias _rf_pbListScreen pbListScreen if !defined?(_rf_pbListScreen)
def pbListScreen(title, lister)
  viewport = Viewport.new(0, 0, Graphics.width, Graphics.height)
  viewport.z = 99999
  list = pbListWindow([])
  list.viewport = viewport
  list.z        = 2
  titlewin = Window_UnformattedTextPokemon.newWithSize(
    title, Graphics.width / 2, 0, Graphics.width / 2, 64, viewport
  )
  titlewin.z = 2
  lister.setViewport(viewport)
  commands = lister.commands
  if commands.length == 0
    value = lister.value(-1)
    lister.dispose
    titlewin.dispose
    list.dispose
    viewport.dispose
    return value
  end
  full = []
  commands.each_with_index { |c, i| full.push([c, i]) }
  query = ""
  shown = full
  apply = proc {
    q = query.to_s
    shown = []
    full.each do |pair|
      shown.push(pair) if q.strip == "" || RedforgeDebug.match?(pair[0], q)
    end
    if shown.length == 0
      list.commands = [_INTL("(결과 없음)")]
    else
      texts = []
      shown.each { |pair| texts.push(pair[0]) }
      list.commands = texts
    end
    list.index = 0
  }
  list.commands = commands
  list.index    = lister.startIndex
  selected = list.index
  orig = proc {
    pair = shown[list.index]
    pair ? pair[1] : -1
  }
  loop do
    Graphics.update
    Input.update
    list.update
    oi = orig.call
    if oi != selected
      lister.refresh(oi) if oi >= 0
      selected = oi
    end
    if RedforgeDebug.search_key?
      pbPlayDecisionSE
      query = RedforgeDebug.prompt_query(query)
      apply.call
      selected = -1
    elsif Input.trigger?(Input::BACK)
      if query.to_s.strip != ""
        query = ""
        apply.call
        selected = -1
      else
        selected = -1
        break
      end
    elsif Input.trigger?(Input::USE)
      selected = orig.call
      break
    end
  end
  value = lister.value(selected)
  lister.dispose
  titlewin.dispose
  list.dispose
  viewport.dispose
  Input.update
  return value
end

alias _rf_pbListScreenBlock pbListScreenBlock if !defined?(_rf_pbListScreenBlock)
def pbListScreenBlock(title, lister)
  viewport = Viewport.new(0, 0, Graphics.width, Graphics.height)
  viewport.z = 99999
  list = pbListWindow([], Graphics.width / 2)
  list.viewport = viewport
  list.z        = 2
  titlewin = Window_UnformattedTextPokemon.newWithSize(
    title, Graphics.width / 2, 0, Graphics.width / 2, 64, viewport
  )
  titlewin.z = 2
  lister.setViewport(viewport)
  commands = lister.commands
  if commands.length == 0
    value = lister.value(-1)
    lister.dispose
    titlewin.dispose
    list.dispose
    viewport.dispose
    return value
  end
  full = []
  rebuild = proc {
    commands = lister.commands
    full = []
    commands.each_with_index { |c, i| full.push([c, i]) }
  }
  rebuild.call
  query = ""
  shown = full
  apply = proc {
    q = query.to_s
    shown = []
    full.each do |pair|
      shown.push(pair) if q.strip == "" || RedforgeDebug.match?(pair[0], q)
    end
    if shown.length == 0
      list.commands = [_INTL("(결과 없음)")]
    else
      texts = []
      shown.each { |pair| texts.push(pair[0]) }
      list.commands = texts
    end
    list.index = 0
  }
  list.commands = commands
  list.index = lister.startIndex
  selected = list.index
  orig = proc {
    pair = shown[list.index]
    pair ? pair[1] : -1
  }
  loop do
    Graphics.update
    Input.update
    list.update
    oi = orig.call
    if oi != selected
      lister.refresh(oi) if oi >= 0
      selected = oi
    end
    if RedforgeDebug.search_key?
      pbPlayDecisionSE
      query = RedforgeDebug.prompt_query(query)
      apply.call
      selected = -1
    elsif Input.trigger?(Input::ACTION)
      yield(Input::ACTION, lister.value(orig.call))
      rebuild.call
      query = ""
      apply.call
    elsif Input.trigger?(Input::BACK)
      if query.to_s.strip != ""
        query = ""
        apply.call
        selected = -1
      else
        break
      end
    elsif Input.trigger?(Input::USE)
      yield(Input::USE, lister.value(orig.call))
      rebuild.call
      query = ""
      apply.call
    end
  end
  lister.dispose
  titlewin.dispose
  list.dispose
  viewport.dispose
  Input.update
end
`;
}

export function buildDebugKoPluginZip(): Uint8Array {
  return zipStore([
    { name: "Plugins/Redforge Debug KO/meta.txt", data: META },
    { name: "Plugins/Redforge Debug KO/001_DebugKo.rb", data: buildScript() },
  ]);
}
