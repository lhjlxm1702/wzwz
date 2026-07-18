# ============================================================
# Soothe AI 新笔记发布脚本
# 用法：在 PowerShell 中运行 .\new-note.ps1
# ============================================================

$ProjectRoot = "D:\flutterflowsoothe\soothe-website"
$SclDir      = "$ProjectRoot\scl"
$ConfigFile  = "$ProjectRoot\.vitepress\config.mts"
$IndexFile   = "$SclDir\index.md"
$Server      = "root@120.55.0.110"
$RemotePath  = "/www/wwwroot/www.soothe.jx.cn/"

# 1. 收集信息
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Soothe AI 新笔记发布助手" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$noteTitle = Read-Host "请输入笔记标题（例如：新生儿脐带护理全攻略）"
$noteDesc  = Read-Host "请输入笔记描述（一句话概括内容，用于SEO）"
$navText   = Read-Host "请输入侧边栏短名称（例如：脐带护理）"

# 2. 自动生成文件名（按现有文件数量编号）
$existingNotes = @(Get-ChildItem "$SclDir\note-*.md")
$nextNum       = "{0:D2}" -f ($existingNotes.Count + 1)
$fileName      = "note-$nextNum.md"
$filePath      = "$SclDir\$fileName"
$linkPath      = "/scl/note-$nextNum"
$linkSlug      = "note-$nextNum"

Write-Host ""
Write-Host "新文件将创建为：scl\$fileName" -ForegroundColor Yellow

# 3. 创建笔记 .md 文件
$mdLines = @()
$mdLines += "---"
$mdLines += "title: $noteTitle"
$mdLines += "description: $noteDesc"
$mdLines += "---"
$mdLines += ""
$mdLines += "# $noteTitle"
$mdLines += ""
$mdLines += "> 本文来自小红书同名账号，转载请注明出处。"
$mdLines += ""
$mdLines += "（在此处粘贴您的图文笔记正文内容）"
$mdLines += ""

[System.IO.File]::WriteAllLines($filePath, $mdLines, [System.Text.Encoding]::UTF8)
Write-Host "已创建：$filePath" -ForegroundColor Green

# 4. 更新 config.mts（侧边栏插入新条目）
$configContent = [System.IO.File]::ReadAllText($ConfigFile, [System.Text.Encoding]::UTF8)
$insertMark    = "// 根据需要继续添加更多页面"
$newLine       = "            { text: '$navText', link: '$linkPath' },`n            $insertMark"

if ($configContent.Contains($insertMark)) {
    $configContent = $configContent.Replace($insertMark, $newLine)
    [System.IO.File]::WriteAllText($ConfigFile, $configContent, [System.Text.Encoding]::UTF8)
    Write-Host "已更新 config.mts 侧边栏" -ForegroundColor Green
} else {
    Write-Host "未找到占位注释，请手动在 config.mts 侧边栏添加：" -ForegroundColor Red
    Write-Host "  { text: '$navText', link: '$linkPath' }" -ForegroundColor Yellow
}

# 5. 更新 scl/index.md（目录页追加新链接）
$newIndexLine = "- [$noteTitle](./$linkSlug)"
Add-Content -Path $IndexFile -Value $newIndexLine -Encoding UTF8
Write-Host "已更新 scl/index.md 目录" -ForegroundColor Green

# 6. 构建
Write-Host ""
Write-Host "开始构建..." -ForegroundColor Yellow
Set-Location $ProjectRoot
npm run docs:build

if ($LASTEXITCODE -ne 0) {
    Write-Host "构建失败，请检查错误信息后重试。" -ForegroundColor Red
    exit 1
}
Write-Host "构建成功" -ForegroundColor Green

# 7. 上传
Write-Host ""
Write-Host "开始上传到服务器（需要输入 SSH 密码）..." -ForegroundColor Yellow
scp -r "$ProjectRoot\.vitepress\dist\*" "${Server}:${RemotePath}"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  全部完成！新笔记已上线" -ForegroundColor Green
Write-Host "  网址：https://www.soothe.jx.cn$linkPath" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
