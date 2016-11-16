echo 'Podaj nazwe projektu:';
    read dir;
while [ -d '$dir' ]; do
	echo 'Katalog " $dir "już istnieje podaj nową nazwę';
	echo 'Podaj nazwe strony:';
	read dir;
done
if [ ! -d '$dir' ]; then
	mkdir $dir;
fi
git clone https://github.com/krzysiek3d/bs4-scss-gulp-template.git $dir;
cd $dir;
npm install;
gulp;