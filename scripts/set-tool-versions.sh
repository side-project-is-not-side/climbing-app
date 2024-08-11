echo $PWD

if [ ! -f "$PWD/.tool-versions" ]; then
  echo "루트 경로에 .tool-versions이 있는지 살펴주세요. 해당 경로가 바뀐다면 Scheme에서의 pre-action에서 역시 스크립트가 수정되어야 해요."
  exit 1
fi

# IFS: 쉘이 필드 구분자로 사용하는 문자 목록을 정의해요.
# 공백을 기준으로 앞 글자만 반복해서 출력해요.
while IFS=' ' read -r tool _; do
  echo "$tool"
  
  # asdf 플러그인을 먼저 추가해요.
  asdf plugin-add "$tool"
done < .tool-versions

# .tool-versions에 있는 버전을 설치해요.
asdf install

# 다시 반복문을 실행해서, 로컬에서 버전에 맞는 툴을 적용해요.
while IFS=' ' read -r tool version; do
  asdf local "$tool" "$version"
done < .tool-versions

# 터미널을 다시 실행해요.
exec $SHELL