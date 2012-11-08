# 3taps API Javascript Wrapper

Originally created by Brandon Goldman http://goldmaninteractive.com

## Dependency

JQuery 1.5+ http://jquery.com/

json2 https://github.com/douglascrockford/JSON-js

Jasmine for unit testing. http://pivotal.github.com/jasmine/

## Example

	<script src="3taps.js" type="text/javascript"></script>

	<script language="javascript">
		var client = new threeTapsClient('your_api_key');

		client.search.search({
			annotations: '{source_loc:washingtondc}'
		});

		client.search.count({
			annotations: '{source_loc:washingtondc}'
		});

		client.search.summary({
			annotations: '{source_loc:washingtondc}'
		});

		client.reference.categories();
	</script>

## License

Copyright (c) 2011 3taps Inc. 

Licensed under the Apache License, Version 2.0 (the "License"); 
you may not use this file except in compliance with the License. 
You may obtain a copy of the License at 

  http://www.apache.org/licenses/LICENSE-2.0 

Unless required by applicable law or agreed to in writing, software 
distributed under the License is distributed on an "AS IS" BASIS, 
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
See the License for the specific language governing permissions and 
limitations under the License.


